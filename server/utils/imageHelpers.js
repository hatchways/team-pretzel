import Image from "../models/Image";

export const getVotes = async imageId => {
  try {
    const image = await Image.findById(imageId);
    const currentVotes = await image.castBy.length;
    return currentVotes;
  } catch (err) {
    console.log("Error", err);
  }
};
