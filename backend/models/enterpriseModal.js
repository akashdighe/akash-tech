import mongoose from "mongoose";

const enterpriseSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  location: { type: String },
  contactInfo: { type: String },
});

const Enterprise = mongoose.model("Enterprise", enterpriseSchema);

export default Enterprise;
