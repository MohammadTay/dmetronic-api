import express from "express";
import {
    createTutorial,
    deleteTutorial,
    getTutorial,
    getTutorials
} from "../controllers/tutorial.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/", verifyToken, createTutorial);
router.delete("/:id", verifyToken, deleteTutorial);
router.get("/single/:id", getTutorial);
router.get("/", getTutorials);

export default router;
