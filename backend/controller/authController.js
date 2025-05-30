import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModal.js";
import AuthUser from "../models/userModal.js";

const JWT_SECRET = process.env.JWT_SECRET || "Akash_Tech"; // Use env variable in production

// Login Controller
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Find user by username and populate role & permissions
    const user = await AuthUser.findOne({ username }).populate("role");

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    console.log(user);
    // Prepare user payload (avoid sending password hash)
    const payload = {
      userId: user._id,
      name: user.name,
      username: user.username,
      enterprise: user.enterprise._id,
      role: {
        id: user.role._id,
        name: user.role.name,
        permissions: user.role.permissions,
      },
    };

    // Sign JWT token (valid for 1 day)
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, user: payload });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
