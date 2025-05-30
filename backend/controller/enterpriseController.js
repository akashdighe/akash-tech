import Enterprise from "../models/enterpriseModal.js";

// Create Enterprise
export const createEnterprise = async (req, res) => {
  try {
    const { name, location, contactInfo } = req.body;

    if (!name) return res.status(400).json({ message: "Name is required." });

    const existing = await Enterprise.findOne({ name });
    if (existing)
      return res
        .status(409)
        .json({ message: "Enterprise name already exists." });

    const enterprise = new Enterprise({ name, location, contactInfo });
    await enterprise.save();

    res.status(201).json(enterprise);
  } catch (err) {
    console.error("Create Enterprise Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all Enterprises
export const getEnterprises = async (req, res) => {
  try {
    const enterprises = await Enterprise.find();
    res.json(enterprises);
  } catch (err) {
    console.error("Get Enterprises Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Enterprise by ID
export const getEnterpriseById = async (req, res) => {
  try {
    const enterprise = await Enterprise.findById(req.params.id);
    if (!enterprise)
      return res.status(404).json({ message: "Enterprise not found" });
    res.json(enterprise);
  } catch (err) {
    console.error("Get Enterprise By ID Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Enterprise
export const updateEnterprise = async (req, res) => {
  try {
    const { name, location, contactInfo } = req.body;

    if (name) {
      const existing = await Enterprise.findOne({
        name,
        _id: { $ne: req.params.id },
      });
      if (existing)
        return res
          .status(409)
          .json({ message: "Enterprise name already exists." });
    }

    const updateData = { name, location, contactInfo };

    // Remove undefined fields from updateData
    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    const enterprise = await Enterprise.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!enterprise)
      return res.status(404).json({ message: "Enterprise not found" });

    res.json(enterprise);
  } catch (err) {
    console.error("Update Enterprise Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Enterprise
export const deleteEnterprise = async (req, res) => {
  try {
    const enterprise = await Enterprise.findByIdAndDelete(req.params.id);
    if (!enterprise)
      return res.status(404).json({ message: "Enterprise not found" });
    res.json({ message: "Enterprise deleted successfully" });
  } catch (err) {
    console.error("Delete Enterprise Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
