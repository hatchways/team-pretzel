import multerUpload from "../utils/multerUpload";
import catchAsync from "../utils/catchAsync";
import Poll from "../models/Poll";
import Image from "../models/Image";

export const uploadPollImages = multerUpload.array("images", 2);

export const savePollImages = catchAsync(async (req, res, next) => {
  if (!req.files) return;
  let images = [];
  for (let file of req.files) {
    const newImage = await Image.create({ url: file.location });
    images.push(newImage);
  }
  req.body.images = images;
  next();
});

export const createPoll = catchAsync(async (req, res, next) => {
  const poll = await Poll.create(req.body);

  res.status(201).json({
    status: "success",
    poll
  });
});

export const getPoll = catchAsync(async (req, res, next) => {
  const poll = await Poll.findById(req.params.id).populate("images");
  res.status(200).json({
    status: "success",
    poll
  });
});

export const getAllPolls = catchAsync(async (req, res, next) => {
  const polls = await Poll.find();
  res.status(200).json({
    status: "success",
    polls
  });
});

// Get all polls for a user
export const getUserPolls = catchAsync(async (req, res, next) => {
  const polls = await Poll.find({ createdBy: req.params.id });
  res.status(200).json({
    status: "success",
    polls
  });
});

// Delete a poll
export const deletePoll = catchAsync(async (req, res, next) => {
  const poll = await Poll.findById(req.params.id);
  // Delete images
  await poll.images.forEach(
    async image => await Image.findByIdAndDelete(image)
  );
  // Delete poll
  await Poll.findByIdAndDelete(req.params.id);

  res.json({
    status: "Poll deleted"
  });
});
