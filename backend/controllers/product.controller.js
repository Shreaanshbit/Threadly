import Product from "../models/Product.js";

export async function listProducts(req, res) {
  const { category, q, sort } = req.query;

  const filter = { isActive: true };

  if (category) filter.category = category;

  if (q) {
    filter.$or = [
      { name: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } }
    ];
  }

  let cursor = Product.find(filter);

  if (sort === "priceAsc") cursor = cursor.sort({ price: 1 });
  if (sort === "priceDesc") cursor = cursor.sort({ price: -1 });
  if (sort === "newest") cursor = cursor.sort({ createdAt: -1 });

  const products = await cursor.lean();
  res.json({ success: true, products });
}

export async function getProduct(req, res) {
  const p = await Product.findById(req.params.id).lean();
  if (!p || !p.isActive) return res.status(404).json({ success: false, message: "Product not found" });
  res.json({ success: true, product: p });
}

export async function adminCreateProduct(req, res) {
  const { name, category, price, offerPrice, description, imageUrl, stock } = req.body || {};

  if (!name || !category || price === undefined) {
    return res.status(400).json({ success: false, message: "name, category, price required" });
  }

  const p = await Product.create({
    name: String(name).trim(),
    category: String(category).trim(),
    price: Number(price),
    offerPrice: offerPrice === null || offerPrice === undefined || offerPrice === "" ? null : Number(offerPrice),
    description: description ? String(description) : "",
    imageUrl: imageUrl ? String(imageUrl) : "",
    stock: stock === undefined || stock === null || stock === "" ? 0 : Number(stock)
  });

  res.status(201).json({ success: true, product: p });
}

export async function adminUpdateProduct(req, res) {
  const payload = { ...req.body };

  if (payload.name !== undefined) payload.name = String(payload.name).trim();
  if (payload.category !== undefined) payload.category = String(payload.category).trim();
  if (payload.description !== undefined) payload.description = String(payload.description);
  if (payload.imageUrl !== undefined) payload.imageUrl = String(payload.imageUrl);

  if (payload.price !== undefined) payload.price = Number(payload.price);
  if (payload.offerPrice !== undefined) {
    payload.offerPrice = payload.offerPrice === null || payload.offerPrice === "" ? null : Number(payload.offerPrice);
  }
  if (payload.stock !== undefined) payload.stock = Number(payload.stock);

  const updated = await Product.findByIdAndUpdate(req.params.id, payload, { new: true }).lean();
  if (!updated) return res.status(404).json({ success: false, message: "Product not found" });

  res.json({ success: true, product: updated });
}

export async function adminDeleteProduct(req, res) {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ success: false, message: "Product not found" });

  p.isActive = false;
  await p.save();

  res.json({ success: true });
}