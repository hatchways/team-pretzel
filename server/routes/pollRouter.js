import express from "express";
const router = express.Router();

import * as authController from "../controllers/authController";
import * as pollController from "../controllers/pollController";

router.get("/", pollController.getAllPolls);
router.post(
  "/",
  authController.checkAuth,
  pollController.uploadPollImages,
  pollController.savePollImages,
  pollController.createPoll
);

router.get("/:id", pollController.getPoll);

// Get all polls for a user
router.get("/user-polls/:id", pollController.getUserPolls);

// Delete a poll
router.delete("/:id", authController.checkAuth, pollController.deletePoll);

export default router;
