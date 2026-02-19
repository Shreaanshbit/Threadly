import mongoose from "mongoose";

const OfferSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    type: { type: String, enum: ["PERCENT", "FLAT"], required: true },
    value: { type: Number, required: true, min: 0 },
    appliesTo: { type: String, enum: ["ALL", "CATEGORY", "PRODUCTS"], default: "ALL" },
    category: { type: String, default: null },
    productIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    startsAt: { type: Date, default: null },
    endsAt: { type: Date, default: null },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Offer", OfferSchema);