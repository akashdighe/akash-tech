import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controller/productController.js";
import upload from "../middlewares/upload.js";

const productRouter = express.Router();


productRouter.post("/", upload.single("image"), createProduct);
productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);
productRouter.put("/:id", upload.single("image"), updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;
