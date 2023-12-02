import express from "express";
import {
    createHardware,
    deleteHardware,
    getHardware,
    getHardwares
} from "../controllers/hardware.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/", verifyToken, createHardware);
router.delete("/:id", verifyToken, deleteHardware);
router.get("/single/:id", getHardware);
router.get("/", getHardwares);

export default router;
