import multerUpload from "../utils/multerUpload";
import Poll from "../models/Poll";

export const uploadPollImages = multerUpload.array("images", 2);

export const createPoll = async (req, res, next) => {
  const newPoll = await Poll.create(req.body);

  res.status(201).json({
    status: "success",
    data: { poll: newPoll }
  });
};
export const getAllPolls = async (req, res, next) => {
  const polls = await Poll.find();

  res.status(200).json({
    status: "success",
    data: { polls }
  });
};
