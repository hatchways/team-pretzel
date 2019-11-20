import express from "express";
const router = express.Router();

import * as authController from "../controllers/authController";
import * as imageController from "../controllers/imageController";

router.post("/:id", authController.checkAuth, imageController.castVote);

export default router;
