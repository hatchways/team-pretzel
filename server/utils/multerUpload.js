import multer from "multer";

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, nextFn) => {
  file.mimetype.startsWith("image")
    ? nextFn(null, true)
    : nextFn(new Error("Not an image"), false);
};

const multerUpload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

export default multerUpload;
