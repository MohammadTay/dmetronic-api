import express from "express";
import {
    createSoftware,
    deleteSoftware,
    getSoftware,
    getSoftwares
} from "../controllers/software.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/", verifyToken, createSoftware);
router.delete("/:id", verifyToken, deleteSoftware);
router.get("/single/:id", getSoftware);
router.get("/", getSoftwares);

export default router;
