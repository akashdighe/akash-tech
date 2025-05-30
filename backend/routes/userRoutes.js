import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  resetPassword,
  updateUser,
} from "../controller/userController.js";
import permissionMiddleware from "../middlewares/permissionMiddleware.js";

const userRouter = express.Router();

// userRouter.use(authMiddleware);
// userRouter.use(permissionMiddleware("users", "read"));

userRouter.post("/", createUser);
userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.put(
  "/:id/reset-password",
  permissionMiddleware("users", "update"),
  resetPassword
);

export default userRouter;
