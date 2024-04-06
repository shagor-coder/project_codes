import multer from "multer";

const validateFileType = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/webp" ||
    file.mimetype === "image/"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG and PNG files are allowed"), false);
  }
};

export const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: validateFileType,
});
