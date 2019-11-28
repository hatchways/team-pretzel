import catchAsync from "../utils/catchAsync";
import Image from "../models/Image";
import Vote from "../models/Vote";

export const vote = catchAsync(async (req, res, next) => {
  const newVote = await Vote.create({
    user: req.user.id,
    image: req.params.id
  });

  const image = await Image.findById(req.params.id);
  image.vote(newVote._id);
  await image.save();

  res.status(201).json({
    status: "success",
    newVote,
    image
  });
});

export const getVoters = catchAsync(async (req, res) => {
  const voters = await Vote.find({ image: req.params.id }).populate("user");

  res.send({
    status: "success",
    voters
  });
});
