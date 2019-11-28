import express from "express";
const router = express.Router();

import * as authController from "../controllers/authController";
import * as imageController from "../controllers/imageController";
import * as voteController from "../controllers/voteController";

router.post("/:id", authController.checkAuth, voteController.vote);

export default router;
