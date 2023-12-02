import express from "express";
import {
  createWiring,
  deleteWiring,
  getWiring,
  getWirings
} from "../controllers/wiring.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/", verifyToken, createWiring);
router.delete("/:id", verifyToken, deleteWiring);
router.get("/single/:id", getWiring);
router.get("/", getWirings);

export default router;
