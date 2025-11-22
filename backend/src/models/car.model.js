import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  title: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  kmDriven: { type: Number, required: true },
  fuelType: { type: String, required: true },
  transmission: { type: String, required: true },
  images: { type: [String], required: false },
  isLive: { type: Boolean, default: true },
  // Owner / Seller
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  // Buyer
  isSold: { type: Boolean, default: false },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }
}, { timestamps: true });

export const Car = mongoose.model("Car", carSchema);
