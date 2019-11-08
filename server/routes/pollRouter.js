import express from "express";

const router = express.Router();

import * as authController from "../controllers/authController";
import * as pollController from "../controllers/pollController";

router.get("/", pollController.getAllPolls);
router.post(
  "/new-poll",
  authController.checkAuth,
  pollController.uploadPollImages,
  pollController.savePollImages,
  pollController.createPoll
);

export default router;
