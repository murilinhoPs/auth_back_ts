import multer from 'multer';

export default {
  storage: multer.diskStorage({
    destination: 'uploads',
    filename: (request, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
};
