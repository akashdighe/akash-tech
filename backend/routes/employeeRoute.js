import express from "express";
import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controller/employeeController.js";

const employeeRouter = express.Router();

employeeRouter.post("/", createEmployee);
employeeRouter.get("/", getEmployees);
employeeRouter.get("/:id", getEmployeeById);
employeeRouter.put("/:id", updateEmployee);
employeeRouter.delete("/:id", deleteEmployee);

export default employeeRouter;
