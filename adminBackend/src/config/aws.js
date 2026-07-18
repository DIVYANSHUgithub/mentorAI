import dotenv from 'dotenv';
import { S3Client } from '@aws-sdk/client-s3';

dotenv.config();

export const awsRegion = process.env.AWS_REGION;
export const awsBucketName = process.env.AWS_S3_BUCKET_NAME;

const s3Client = new S3Client({
  region: awsRegion,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export default s3Client;
