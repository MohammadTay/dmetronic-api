import express from "express";
import {
    createDownload,
    deleteDownload,
    getDownload,
    getDownloads
} from "../controllers/download.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/", verifyToken, createDownload);
router.delete("/:id", verifyToken, deleteDownload);
router.get("/single/:id", getDownload);
router.get("/", getDownloads);

export default router;
