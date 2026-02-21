import crypto from "crypto";
import Product from "../models/Product.js";
import Offer from "../models/Offer.js";
import Order from "../models/Order.js";

function makeOrderCode() {
  return "THRD-" + crypto.randomBytes(3).toString("hex").toUpperCase();
}

function isOfferActive(o) {
  if (!o.isActive) return false;
  const now = Date.now();
  if (o.startsAt && now < new Date(o.startsAt).getTime()) return false;
  if (o.endsAt && now > new Date(o.endsAt).getTime()) return false;
  return true;
}

function applyOfferToUnitPrice({ product, unitPrice, offer }) {
  if (!offer) return unitPrice;

  const ok =
    offer.appliesTo === "ALL" ||
    (offer.appliesTo === "CATEGORY" && offer.category && offer.category === product.category) ||
    (offer.appliesTo === "PRODUCTS" &&
      Array.isArray(offer.productIds) &&
      offer.productIds.some((id) => id.toString() === product._id.toString()));

  if (!ok) return unitPrice;

  if (offer.type === "PERCENT") return Math.max(0, +(unitPrice * (1 - offer.value / 100)).toFixed(2));
  if (offer.type === "FLAT") return Math.max(0, +(unitPrice - offer.value).toFixed(2));
  return unitPrice;
}

function calcAmounts(items) {
  const subtotal = items.reduce((s, it) => s + it.unitPrice * it.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 8;
  const tax = +(subtotal * 0.05).toFixed(2);
  const total = +(subtotal + shipping + tax).toFixed(2);
  return { subtotal: +subtotal.toFixed(2), shipping, tax, total };
}

export async function createOrder(req, res) {
  const { items, shipping, paymentMethod, offerCode } = req.body || {};
  if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ success: false, message: "items required" });
  if (!shipping) return res.status(400).json({ success: false, message: "shipping required" });

  const requiredFields = ["firstName", "lastName", "address", "city", "state", "zip", "phone", "email"];
  for (const f of requiredFields) {
    if (!shipping[f]) return res.status(400).json({ success: false, message: `shipping.${f} required` });
  }

  let offer = null;
  let normalizedOfferCode = null;

  if (offerCode) {
    normalizedOfferCode = String(offerCode).toUpperCase().trim();
    const found = await Offer.findOne({ code: normalizedOfferCode }).lean();
    if (found && isOfferActive(found)) offer = found;
    else normalizedOfferCode = null;
  }

  const normalizedItems = [];

  for (const it of items) {
    const product = await Product.findById(it.productId).lean();
    if (!product || !product.isActive) return res.status(400).json({ success: false, message: "Invalid product in cart" });

    let unitPrice = product.offerPrice ?? product.price;
    unitPrice = applyOfferToUnitPrice({ product, unitPrice, offer });

    normalizedItems.push({
      productId: product._id,
      name: product.name,
      imageUrl: product.imageUrl || "",
      unitPrice,
      quantity: Math.max(1, Number(it.quantity || 1))
    });
  }

  const amounts = calcAmounts(normalizedItems);

  const order = await Order.create({
    orderCode: makeOrderCode(),
    items: normalizedItems,
    shipping,
    paymentMethod: paymentMethod === "COD" ? "COD" : "COD",
    offerCode: normalizedOfferCode,
    amounts,
    status: "Pending"
  });

  res.status(201).json({ success: true, orderId: order._id, orderCode: order.orderCode });
}

export async function getOrder(req, res) {
  const order = await Order.findById(req.params.id).lean();
  if (!order) return res.status(404).json({ success: false, message: "Order not found" });
  res.json({ success: true, order });
}

export async function adminListOrders(req, res) {
  const orders = await Order.find().sort({ createdAt: -1 }).lean();
  res.json({ success: true, orders });
}

export async function adminUpdateOrderStatus(req, res) {
  const { status } = req.body || {};
  const allowed = ["Pending", "Completed"];
  if (!allowed.includes(status)) return res.status(400).json({ success: false, message: "Invalid status" });

  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true }).lean();
  if (!order) return res.status(404).json({ success: false, message: "Order not found" });

  res.json({ success: true, order });
}