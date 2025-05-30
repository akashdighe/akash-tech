import Product from "../models/productModal.js";
// Create a product
export const createProduct = async (req, res) => {
  try {
    const { name, image, details, category, price, status, enterprise } =
      req.body;

    const product = new Product({
      name,
      image,
      details,
      category,
      price,
      status,
      enterprise: enterprise || null,
    });

    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating product", error: error.message });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("enterprise", "name");
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "enterprise",
      "name"
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching product", error: error.message });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const { name, image, details, category, price, status, enterprise } =
      req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        image,
        details,
        category,
        price,
        status,
        enterprise: enterprise || null,
      },
      { new: true }
    );

    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
};
