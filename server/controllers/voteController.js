import catchAsync from "../utils/catchAsync";
import Image from "../models/Image";
import Vote from "../models/Vote";
import Poll from "../models/Poll";
import AppError from "../utils/AppError";

export const vote = catchAsync(async (req, res, next) => {
  // get the poll that the image belongs to
  // const poll = await Poll.find({
  //   images: { _id: req.params.id }
  // });

  // const otherImageId = poll[0].getOtherImage(req.params.id);
  // const otherImage = await Image.findById(otherImageId);

  // // check if user has voted on the other image
  // if (otherImage.castBy.includes(req.user.id))
  //   return next(
  //     new AppError("You can't vote for both images in a same poll", 500)
  //   );

  const newVote = await Vote.create({
    user: req.user.id,
    image: req.params.id,
    timestamp: req.body.timestamp,
    poll: req.body.poll
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

export const getVotesByPoll = catchAsync(async (req, res) => {
  const votes = await Vote.find({ poll: req.params.id })
    .populate("user")
    .populate("image");

  res.status(200).send({
    status: "success",
    votes
  });
});
