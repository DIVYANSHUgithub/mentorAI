import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import s3Client, { awsBucketName } from '../config/aws.js';

const buildSignedUrl = async (key, expiresIn = 60 * 60) => {
  if (!key) {
    return null;
  }

  const command = new GetObjectCommand({
    Bucket: awsBucketName,
    Key: key,
  });

  return getSignedUrl(s3Client, command, { expiresIn });
};

export default buildSignedUrl;
