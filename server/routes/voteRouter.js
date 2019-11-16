import express from "express";

const router = express.Router();

import * as voteController from "../controllers/voteController";

router.post("/cast-vote", voteController.castVote);

export default router;
