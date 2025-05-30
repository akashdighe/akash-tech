import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controller/productController.js";

const productRouter = express.Router();

productRouter.post("/", createProduct);          // Create product
productRouter.get("/", getProducts);            // Get all products
productRouter.get("/:id", getProductById);      // Get product by ID
productRouter.put("/:id", updateProduct);       // Update product
productRouter.delete("/:id", deleteProduct);    // Delete product

export default productRouter;
