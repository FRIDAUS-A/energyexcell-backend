import { Storage } from '@google-cloud/storage';

const createBucket = async (gCredentials, gCloudBucket) => {
  const storage = new Storage({
    keyFilename: gCredentials,
  });
  return storage.bucket(gCloudBucket);
};

export { createBucket };
