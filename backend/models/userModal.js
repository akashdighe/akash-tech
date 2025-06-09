import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true }, // ✅ New field
    phoneNumber: { type: String }, // ✅ New field
    address: {
      type: String,
      required: true,
    },
    passwordHash: { type: String, required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
    enterprise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enterprise",
      default: null,
    },
  },
  { timestamps: true }
);

const AuthUser = mongoose.model("AuthUser", userSchema);

export default AuthUser;
