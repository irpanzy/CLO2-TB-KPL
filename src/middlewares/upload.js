const multer = require("multer");

// Gunakan memory storage untuk upload ke ImageKit
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});

module.exports = upload;
