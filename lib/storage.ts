import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { MOCK_MODE, mockUploadFile } from './mock'

const s3 = !MOCK_MODE
  ? new S3Client({
      region: 'auto',
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
      },
    })
  : null

const BUCKET = process.env.R2_BUCKET_NAME ?? 'ugc-studio'

export async function uploadFile(
  buffer: Buffer,
  key: string,
  contentType: string
): Promise<string> {
  if (MOCK_MODE) {
    return mockUploadFile(buffer, key, contentType)
  }

  await s3!.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    })
  )

  return `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${BUCKET}/${key}`
}

export async function getSignedDownloadUrl(key: string): Promise<string> {
  if (MOCK_MODE) {
    return `https://mock-storage.example.com/${key}`
  }

  return getSignedUrl(
    s3!,
    new GetObjectCommand({ Bucket: BUCKET, Key: key }),
    { expiresIn: 3600 }
  )
}
