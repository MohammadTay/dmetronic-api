import express from "express";
import {
    createPinout,
    deletePinout,
    getPinout,
    getPinouts
} from "../controllers/pinout.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/", verifyToken, createPinout);
router.delete("/:id", verifyToken, deletePinout);
router.get("/single/:id", getPinout);
router.get("/", getPinouts);

export default router;
