import express from "express";
import send_reservation from "../controller/reservation.js";

const reservationRoute = express.Router();

reservationRoute.post("/send", send_reservation);

export default reservationRoute;
