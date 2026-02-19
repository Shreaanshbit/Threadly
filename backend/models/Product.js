import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    offerPrice: { type: Number, default: null, min: 0 },
    description: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    stock: { type: Number, default: 0, min: 0 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);