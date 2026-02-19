import Offer from "../models/Offer.js";

function isOfferActive(o) {
  if (!o.isActive) return false;
  const now = Date.now();
  if (o.startsAt && now < new Date(o.startsAt).getTime()) return false;
  if (o.endsAt && now > new Date(o.endsAt).getTime()) return false;
  return true;
}

export async function adminCreateOffer(req, res) {
  const { title, code, type, value, appliesTo, category, productIds, startsAt, endsAt, isActive } = req.body || {};
  if (!title || !code || !type || value === undefined) {
    return res.status(400).json({ success: false, message: "title, code, type, value required" });
  }

  const offer = await Offer.create({
    title: String(title).trim(),
    code: String(code).toUpperCase().trim(),
    type,
    value: Number(value),
    appliesTo: appliesTo || "ALL",
    category: category ? String(category).trim() : null,
    productIds: Array.isArray(productIds) ? productIds : [],
    startsAt: startsAt || null,
    endsAt: endsAt || null,
    isActive: isActive ?? true
  });

  res.status(201).json({ success: true, offer });
}

export async function adminListOffers(req, res) {
  const offers = await Offer.find().sort({ createdAt: -1 }).lean();
  res.json({ success: true, offers });
}

export async function listActiveOffers(req, res) {
  const offers = await Offer.find({ isActive: true }).sort({ createdAt: -1 }).lean();
  res.json({ success: true, offers: offers.filter(isOfferActive) });
}

export async function adminUpdateOffer(req, res) {
  const payload = { ...req.body };
  if (payload.title !== undefined) payload.title = String(payload.title).trim();
  if (payload.code !== undefined) payload.code = String(payload.code).toUpperCase().trim();
  if (payload.value !== undefined) payload.value = Number(payload.value);
  if (payload.category !== undefined) payload.category = payload.category ? String(payload.category).trim() : null;
  if (payload.productIds !== undefined) payload.productIds = Array.isArray(payload.productIds) ? payload.productIds : [];

  const updated = await Offer.findByIdAndUpdate(req.params.id, payload, { new: true }).lean();
  if (!updated) return res.status(404).json({ success: false, message: "Offer not found" });

  res.json({ success: true, offer: updated });
}

export async function adminDeleteOffer(req, res) {
  const o = await Offer.findById(req.params.id);
  if (!o) return res.status(404).json({ success: false, message: "Offer not found" });

  o.isActive = false;
  await o.save();

  res.json({ success: true });
}