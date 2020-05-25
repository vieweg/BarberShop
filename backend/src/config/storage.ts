import multer, { StorageEngine } from 'multer';
import path from 'path';
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '../', '../', 'tmp');

interface IStorageConfig {
  driver: 'disk' | 's3';
  tmpFolder: string;
  uploadsFolder: string;
  multer: {
    storage: StorageEngine;
  };
  config: {
    disk: {};
    s3: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER || 'disk',
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename: (req, file, callback) => {
        const hashFileName = crypto.randomBytes(10).toString('HEX');
        const filename = `${hashFileName}-${file.originalname}`;
        callback(null, filename);
      },
    }),
  },
  config: {
    disk: {},
    s3: {
      bucket: 'app-gobarber-2020',
    },
  },
} as IStorageConfig;
