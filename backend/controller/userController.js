import bcrypt from "bcrypt";
import User from "../models/userModal.js";
import Role from "../models/roleModal.js";
import Enterprise from "../models/enterpriseModal.js";

// Create User
export const createUser = async (req, res) => {
  try {
    const { username, password, roleId, enterpriseId, name, phoneNumber } =
      req.body;

    if (!username || !password || !roleId || !name) {
      return res
        .status(400)
        .json({
          message: "Username, password, roleId, and name are required.",
        });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists." });
    }

    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(400).json({ message: "Invalid roleId." });
    }

    if (enterpriseId) {
      const enterprise = await Enterprise.findById(enterpriseId);
      if (!enterprise) {
        return res.status(400).json({ message: "Invalid enterpriseId." });
      }
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      name,
      phoneNumber,
      passwordHash,
      role: roleId,
      enterprise: enterpriseId || null,
    });

    await user.save();

    const userResponse = user.toObject();
    delete userResponse.passwordHash;

    res.status(201).json(userResponse);
  } catch (err) {
    console.error("Create User Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .populate("role", "name permissions")
      .populate("enterprise", "name location contactInfo");

    res.json(users);
  } catch (err) {
    console.error("Get Users Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get User By ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("role", "name permissions")
      .populate("enterprise", "name location contactInfo");

    if (!user) return res.status(404).json({ message: "User not found" });

    const userResponse = user.toObject();
    delete userResponse.passwordHash;

    res.json(userResponse);
  } catch (err) {
    console.error("Get User By ID Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update User
export const updateUser = async (req, res) => {
  try {
    const { username, roleId, enterpriseId, name, phoneNumber } = req.body;

    const updateData = {};
    if (username) updateData.username = username;
    if (name) updateData.name = name;
    if (phoneNumber) updateData.phoneNumber = phoneNumber;

    if (roleId) {
      const role = await Role.findById(roleId);
      if (!role) return res.status(400).json({ message: "Invalid roleId." });
      updateData.role = roleId;
    }

    if (enterpriseId) {
      const enterprise = await Enterprise.findById(enterpriseId);
      if (!enterprise)
        return res.status(400).json({ message: "Invalid enterpriseId." });
      updateData.enterprise = enterpriseId;
    }

    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    })
      .populate("role", "name permissions")
      .populate("enterprise", "name location contactInfo");

    if (!user) return res.status(404).json({ message: "User not found" });

    const userResponse = user.toObject();
    delete userResponse.passwordHash;

    res.json(userResponse);
  } catch (err) {
    console.error("Update User Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully." });
  } catch (err) {
    console.error("Delete User Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    if (!newPassword)
      return res.status(400).json({ message: "New password is required." });

    const passwordHash = await bcrypt.hash(newPassword, 10);

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { passwordHash },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Password reset successful." });
  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
