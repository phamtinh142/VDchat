const multer = require('multer');
const fs = require('fs');
const newFileName = require('./newFileName');

module.exports = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      const path = 'public/upload/avatars/';
      if (!fs.existsSync(path)) {
        fs.mkdir(path, (error) => {
          console.log('------- error ------- createDirectoryAvatar');
          console.log(error);
          console.log('------- error ------- createDirectoryAvatar');
        });
      }
      callback(null, path);
    },
    filename: (req, file, callback) => {
      const ext = file.originalname.split('.');
      const fileName = `${newFileName(ext[0])}_${Date.now()}.${ext[ext.length - 1]}`;
      callback(null, fileName);
    },
  }),
  limits: {
    fileSize: 1024 * 1024,
  },
  fileFilter: (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      const error = new Error();
      error.status = 400;
      error.message = 'Bạn chỉ được phép tải ảnh lên!';
      return callback(error);
    }
    callback(null, true);
  },
}).single('avatar');