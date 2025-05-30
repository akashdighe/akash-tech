import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
  module: { type: String, required: true },
  create: { type: Boolean, default: false },
  read: { type: Boolean, default: false },
  update: { type: Boolean, default: false },
  delete: { type: Boolean, default: false },
});

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  permissions: [permissionSchema],
});

const Role = mongoose.model("Role", roleSchema);

export default Role;
