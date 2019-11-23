const path = require("path");
const multer = require("multer");

const storageForPicture = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "../uploads/pictures/"));
  },
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

const storageForDocument = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "../uploads/documents/"));
  },
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

const fileFilterForPicture = (req, file, callback) => {
  const fileExtension = path.extname(file.originalname).toLowerCase();
  if (
    fileExtension == ".jpg" ||
    fileExtension == ".jpeg" ||
    fileExtension == ".png"
  ) {
    callback(null, true);
  } else {
    callback(new Error(`Not supported file extension: ${fileExtension}`));
  }
};

const fileFilterForDocument = (req, file, callback) => {
  const fileExtension = path.extname(file.originalname).toLowerCase();
  if (
    fileExtension == ".jpg" ||
    fileExtension == ".jpeg" ||
    fileExtension == ".png" ||
    fileExtension == ".pdf"
  ) {
    callback(null, true);
  } else {
    callback(new Error(`Not supported file extension: ${fileExtension}`));
  }
};

const uploadPicture = multer({
  storage: storageForPicture,
  fileFilter: fileFilterForPicture,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
}).single("picture");

const uploadDocument = multer({
  storage: storageForDocument,
  fileFilter: fileFilterForDocument,
  limits: {
    fileSize: 10 * 1024 * 1024
  }
}).single("document");

module.exports = {
  uploadPicture,
  uploadDocument
};