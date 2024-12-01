import { Client } from 'minio'

export const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT?.replace('https://', '') || '',
  port: 443,
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY || '',
  secretKey: process.env.MINIO_SECRET_KEY || ''
})

export async function getArticleContent(objectName: string): Promise<string> {
  try {
    const dataStream = await minioClient.getObject(
      process.env.MINIO_BUCKET || '',
      objectName
    )
    
    const chunks: Buffer[] = []
    for await (const chunk of dataStream) {
      chunks.push(chunk)
    }
    
    return Buffer.concat(chunks).toString('utf-8')
  } catch (error) {
    console.error('Error fetching article from MinIO:', error)
    throw error
  }
}
