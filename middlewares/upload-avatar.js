const multer = require('multer');
const { generateError, responseErrors } = require('../helpers');

const MAX_FILE_SIZE = 2000000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'tmp');
  },
  filename: (req, file, cb) => {
    const [, extension] = file.originalname.split('.');
    const avatarName = `${req.user._id.valueOf()}-${
      file.fieldname
    }.${extension}`;
    cb(null, avatarName);
  },
});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.includes('image')) {
    return cb(generateError(responseErrors.notImage), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
}).single('avatar');

const uploadAvatar = (req, res, next) => {
  return upload(req, res, (err) => {
    try {
      if (err instanceof multer.MulterError) {
        throw generateError(responseErrors.avatarSizeTooLarge);
      } else if (err) {
        next(err);
      }
      next();
    } catch (error) {
      next(error);
    }
  });
};

module.exports = { uploadAvatar };
