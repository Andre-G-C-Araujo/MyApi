const path = require("path");
const multer = require("multer");
const crypto = require("crypto");

//onde a imagem chega
const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");
//onde a imagem vai ficar
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads");

// multer biblioteca pra fazer upload
const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(req, file, cb) {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;

      return cb(null, fileName);
    },
  }),
};

module.exports = {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MULTER,
};
