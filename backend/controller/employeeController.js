// controllers/employeeController.js
import bcrypt from "bcrypt";
import AuthUser from "../models/userModal.js";
import Employee from "../models/employeeModal.js";

// Create Employee (entry in both Employee and AuthUser)
export const createEmployee = async (req, res) => {
  try {
    const {
      name,
      username,
      phoneNumber,
      password,
      role,
      enterprise,
      department,
      salary,
      status,
    } = req.body;

    if (!username || !password || !role || !name) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const existingUser = await AuthUser.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const authUser = new AuthUser({
      username,
      name,
      phoneNumber,
      passwordHash,
      role,
      enterprise,
    });
    await authUser.save();

    const employee = new Employee({
      name,
      phoneNumber,
      role,
      enterprise,
      department,
      salary,
      status,
    });
    await employee.save();

    res.status(201).json({ employee, authUser });
  } catch (err) {
    console.error("Create Employee Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Employees
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("role")
      .populate("enterprise");
    res.json(employees);
  } catch (err) {
    console.error("Get Employees Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Employee by ID
export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id)
      .populate("role")
      .populate("enterprise");
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (err) {
    console.error("Get Employee By ID Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Employee
export const updateEmployee = async (req, res) => {
  try {
    const { name, phoneNumber, role, enterprise, department, salary, status } =
      req.body;

    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, phoneNumber, role, enterprise, department, salary, status },
      { new: true }
    );

    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    // Update AuthUser too
    await AuthUser.findOneAndUpdate(
      { username: employee.username },
      { name, phoneNumber, role, enterprise }
    );

    res.json(employee);
  } catch (err) {
    console.error("Update Employee Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Employee
export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    await AuthUser.findOneAndDelete({ username: employee.username });

    res.json({ message: "Employee and associated user deleted" });
  } catch (err) {
    console.error("Delete Employee Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
