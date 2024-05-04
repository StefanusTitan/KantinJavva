const multer = require('multer');
const util = require('util');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log('File upload:', util.inspect(file, { depth: null }));
    cb(null, true);
  },
  debug: true
});

module.exports = upload;