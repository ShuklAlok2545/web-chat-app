import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { deleteMsgBothSide } from "../controllers/DeleteMessagesController.js";

const deleteMsgsRoutes = Router();

deleteMsgsRoutes.post("/msg-both-side/",deleteMsgBothSide);

export default deleteMsgsRoutes;