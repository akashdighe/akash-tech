import express from "express";

import {
  createRole,
  deleteRole,
  getRoleById,
  getRoles,
  updateRole,
} from "../controller/roleController.js";

const roleRouter = express.Router();

// roleRouter.use(authMiddleware);
// roleRouter.use(permissionMiddleware("roles", "read"));

roleRouter.post("/", createRole);
roleRouter.get("/", getRoles);
roleRouter.get("/:id", getRoleById);
roleRouter.put("/:id", updateRole);
roleRouter.delete("/:id", deleteRole);

export default roleRouter;
