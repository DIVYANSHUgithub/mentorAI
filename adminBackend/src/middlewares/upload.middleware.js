import multer from 'multer';

const memoryStorage = multer.memoryStorage();

export const thumbnailUpload = multer({
  storage: memoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, callback) => {
    if (!file.mimetype.startsWith('image/')) {
      callback(new Error('Only image files are allowed'));
      return;
    }
    callback(null, true);
  },
});

export const lectureUpload = multer({
  storage: memoryStorage,
  limits: {
    fileSize: 500 * 1024 * 1024,
  },
  fileFilter: (req, file, callback) => {
    const allowedTypes = ['video/mp4', 'video/webm'];

    if (!allowedTypes.includes(file.mimetype)) {
      callback(new Error('Unsupported file type'));
      return;
    }

    callback(null, true);
  },
});
