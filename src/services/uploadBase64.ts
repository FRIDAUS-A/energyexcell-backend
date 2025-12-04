import { createBucket } from './gcs';

export async function uploadBase64Image(
  base64String: string,
  gCredentials,
  gCloudBucket,
): Promise<string> {
  // create buckert
  const bucket = await createBucket(gCredentials, gCloudBucket);
  // remove header like: data:image/png;base64,
  const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');

  const buffer = Buffer.from(base64Data, 'base64');

  // Choose a file name
  const fileName = `${Date.now()}.png`;

  const file = bucket.file(fileName);

  await file.save(buffer, {
    metadata: {
      contentType: 'image/png',
    },
    public: true, // if your bucket is public
    validation: 'md5',
  });

  // Public URL
  const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

  return publicUrl;
}
