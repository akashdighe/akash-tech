import express from "express";
import reservationRoute from "../routes/reservationRoute.js";
import authRouter from "./authRoute.js";
import userRouter from "./userRoutes.js";
import roleRouter from "./roleRoutes.js";
import enterpriseRouter from "./enterpriseRoute.js";
import productRouter from "./productRoute.js";
import employeeRouter from "./employeeRoute.js";

const route = express.Router();

route.use("/reservation", reservationRoute);
route.use("/auth", authRouter);
route.use("/api/roles", roleRouter);
route.use("/api/users", userRouter);
route.use("/api/enterprise", enterpriseRouter);
route.use("/api/products", productRouter);
route.use("/api/employees", employeeRouter);

export default route;
