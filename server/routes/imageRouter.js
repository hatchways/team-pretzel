import express from "express";
const router = express.Router();

import * as authController from "../controllers/authController";
import * as imageController from "../controllers/imageController";

router.post("/cast/:id", authController.checkAuth, imageController.castVote);
router.get("/:id", authController.checkAuth, imageController.getImage);

export default router;
