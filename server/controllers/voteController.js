import Poll from "../models/Poll";
import Vote from "../models/Vote";
import catchAsync from "../utils/catchAsync";

export const castVote = catchAsync(async (req, res, next) => {
  // imageId
  // const poll = await Poll.findById(req.body.pollId);
  // let votedImage = poll.images.id(req.body.imageId);
  const newVote = await Vote.create(req.body);
  // newVote.castVote();

  res.status(200).json({
    status: "success",
    data: { newVote }
  });
});
