import multerUpload from "../utils/multerUpload";
import catchAsync from "../utils/catchAsync";
import Poll from "../models/Poll";

export const uploadPollImages = multerUpload.array("images", 2);
export const savePollImages = (req, res, next) => {
  if (!req.files) return;
  let images = [];
  req.files.map(file => images.push(file.location));
  req.body.images = images;
  next();
};

export const createPoll = catchAsync(async (req, res, next) => {
  const newPoll = await Poll.create(req.body);
  res.status(201).json({
    status: "success",
    data: { poll: newPoll }
  });
});

export const getAllPolls = catchAsync(async (req, res, next) => {
  const polls = await Poll.find();
  res.status(200).json({
    status: "success",
    data: { polls }
  });
});
