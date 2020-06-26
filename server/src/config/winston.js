const winston = require('winston');
const path = require('path');

module.exports = winston.createLogger({
  // Cấu hình format cho log
  format: winston.format.combine(
    winston.format.splat(),
    // Định dạng thời gian cho log 
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    // Thêm màu sắc cho log
    winston.format.colorize(),
    // Thiết lập định dạng cho log
    winston.format.printf((log) => {
      // Nếu log là error thì hiển thị stack trace còn không thì hiển thị message của log
      if (log.stack) return `[${log.timestamp}] [${log.level}] ${log.stack}`;
      return `[${log.timestamp}] [${log.level}] ${log.message}`;
    })
  ),
  transports: [
    // Hiển thị log thông qua console
    new winston.transports.Console(),
    // Ghi các error vào file log
    new winston.transports.File({
      level: 'error',
      filename: path.join(__dirname, 'errors.log'),
    }),
  ],
});