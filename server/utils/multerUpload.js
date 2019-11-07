import multer from "multer";

const multerStorage = multer.diskStorage({
  destination: (req, file, nextFn) => {
    nextFn(null, "public/img/users");
  },
  filename: (req, file, nextFn) => {
    // user-id-currentTimestamp.jpeg
    const ext = file.mimetype.split("/")[1];
    nextFn(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  }
});

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
