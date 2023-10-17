const multer = require("multer");
const uuid = require("uuid");
const imageId = uuid.v4();

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `profile-${imageId}-${Date.now()}.${ext}`);
  }
});

const multerFilter = (req, file, cb) => {
  console.log('File MIME Type:', file.mimetype);
  
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    console.log('Unsupported File Type');
    cb(new Error("File type not supported"), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadImage = upload.single("image");

module.exports = { uploadImage };