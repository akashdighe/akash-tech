import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // ✅ New field
    phoneNumber: { type: String }, // ✅ New field
      role: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
    enterprise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enterprise",
      default: null,
    },
    department: { type: String },
    salary: { type: Number },
    status: { type: String },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
