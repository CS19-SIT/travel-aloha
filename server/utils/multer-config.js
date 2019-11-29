const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    if (file.fieldname === "hotelProfile")
      callback(null, path.join(__dirname, "../../public/assets/uploads/contact/documents"));
    else
      callback(null, path.join(__dirname, "../../public/assets/uploads/contact/pictures"));
    if (file.fieldname === "airlineProfile")
      callback(null, path.join(__dirname, "../../public/assets/uploads/contact/documents"));
    else
      callback(null, path.join(__dirname, "../../public/assets/uploads/contact/pictures"));
  },
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

const fileFilter = (req, file, callback) => {
  const fileExtension = path.extname(file.originalname).toLowerCase();
  if (
    fileExtension == ".jpg" ||
    fileExtension == ".jpeg" ||
    fileExtension == ".png" ||
    (file.fieldname === "hotelProfile" && fileExtension == ".pdf") ||
    (file.fieldname === "airlineProfile" && fileExtension == ".pdf")
  ) {
    callback(null, true);
  } else {
    callback(new Error(`Not supported file extension: ${fileExtension}`));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024
  }
}).fields([
 { name: "hotelProfile", maxCount: 1 },
 { name: "hotelPicture", maxCount: 1 },
 { name: "airlineProfile", maxCount: 1},
 { name: "airlinePicture", maxCount: 1},
]);

module.exports = {
  upload
};