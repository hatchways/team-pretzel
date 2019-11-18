import catchAsync from "../utils/catchAsync";
import Image from "../models/Image";

export const castVote = catchAsync(async (req, res, next) => {
  const image = await Image.findById(req.params.id);
  image.vote(req.body.userId);
  await image.save();

  res.status(200).json({
    status: "success",
    image
  });
});
