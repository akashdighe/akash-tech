import express from "express";
import {
  createEnterprise,
  deleteEnterprise,
  getEnterpriseById,
  getEnterprises,
  updateEnterprise,
} from "../controller/enterpriseController.js";

const enterpriseRouter = express.Router();

// Create
enterpriseRouter.post("/", createEnterprise);

// Read All
enterpriseRouter.get("/", getEnterprises);

// Read One
enterpriseRouter.get("/:id", getEnterpriseById);

// Update
enterpriseRouter.put("/:id", updateEnterprise);

// Delete
enterpriseRouter.delete("/:id", deleteEnterprise);

export default enterpriseRouter;
