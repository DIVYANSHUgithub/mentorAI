import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import s3Client, { awsBucketName } from '../config/aws.js';
import buildSignedUrl from '../utils/signedUrl.js';

export const uploadFileBuffer = async ({ key, buffer, contentType }) => {
  const command = new PutObjectCommand({
    Bucket: awsBucketName,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  });

  await s3Client.send(command);
};

export const deleteFileByKey = async (key) => {
  if (!key) {
    return;
  }

  const command = new DeleteObjectCommand({
    Bucket: awsBucketName,
    Key: key,
  });

  await s3Client.send(command);
};

export const getSignedFileUrl = (key, expiresIn) =>
  buildSignedUrl(key, expiresIn);
