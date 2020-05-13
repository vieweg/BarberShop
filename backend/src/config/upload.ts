import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '../', '../', 'tmp');

export default {
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (req, file, callback) => {
      const hashFileName = crypto.randomBytes(10).toString('HEX');
      const filename = `${hashFileName}-${file.originalname}`;
      callback(null, filename);
    },
  }),
};
