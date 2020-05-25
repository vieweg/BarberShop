import fs from 'fs';
import mime from 'mime';
import aws, { S3 } from 'aws-sdk';
import path from 'path';

import IStorageProvider from '../models/IStorageProvider';
import storageConfig from '@config/storage';
import AppError from '@shared/errors/AppError';

export default class DiskStorageProvider implements IStorageProvider {
  private client: S3;
  constructor() {
    this.client = new aws.S3();
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(storageConfig.tmpFolder, file);
    const contentType = mime.getType(originalPath);
    const contentFile = await fs.promises.readFile(originalPath);

    if (!contentType) {
      throw new AppError('File not found');
    }

    await this.client
      .putObject({
        Bucket: storageConfig.config.s3.bucket,
        Key: file,
        ACL: 'public-read',
        Body: contentFile,
        ContentType: contentType,
      })
      .promise();

    if (fs.existsSync(originalPath)) {
      await fs.promises.unlink(originalPath);
    }

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: storageConfig.config.s3.bucket,
        Key: file,
      })
      .promise();
  }
}
