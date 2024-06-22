import { Inject, Injectable } from '@nestjs/common'
import { ConstantKeys } from '../../config/constant-keys.enum'
import {
  PutObjectCommand,
  S3Client,
  DeleteObjectCommand
} from '@aws-sdk/client-s3'

@Injectable()
export class AwsS3Service {
  constructor(
    @Inject(ConstantKeys.awsS3Bucket) private readonly s3Bucket: string,
    @Inject(ConstantKeys.awsAccessKeyId) private readonly accessKeyId: string,
    @Inject(ConstantKeys.awsSecretAccessKey)
    private readonly secretAccessKey: string
  ) {}

  async uploadFile(file: Express.Multer.File) {
    const { originalname } = file

    const uploadResponse = await this.s3Upload(
      file.buffer,
      this.s3Bucket,
      originalname,
      file.mimetype
    )

    const fileUrl = await this.getFileURL(originalname)

    return {
      ...uploadResponse,
      fileUrl
    }
  }

  async removeImage(imageUrl: string): Promise<void> {
    try {
      const fileName = this.getImageName(imageUrl)
      console.log(fileName)
      const objectCommand = new DeleteObjectCommand({
        Bucket: this.s3Bucket,
        Key: String(fileName)
      })
      const awsS3 = new S3Client({
        credentials: {
          accessKeyId: this.accessKeyId,
          secretAccessKey: this.secretAccessKey
        },
        region: 'us-east-2'
      })
      await awsS3.send(objectCommand)
    } catch (e) {
      console.log('ERROR ON REMOVE FILE: ', e)
    }
  }

  private async s3Upload(
    file: Buffer,
    bucket: string,
    originalName: string,
    mimetype: string
  ) {
    const objectCommand = new PutObjectCommand({
      Bucket: bucket,
      Key: String(originalName),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline'
    })

    try {
      const awsS3 = new S3Client({
        credentials: {
          accessKeyId: this.accessKeyId,
          secretAccessKey: this.secretAccessKey
        },
        region: 'us-east-2'
      })
      return awsS3.send(objectCommand)
    } catch (e) {
      console.log('ERROR ON UPLOAD FILE: ', e)
    }
  }

  private async getFileURL(originalName: string) {
    return `https://${this.s3Bucket}.s3.amazonaws.com/${originalName}`
  }

  private getImageName(url: string) {
    const filePath = url.split('/').pop()
    return filePath.split('.').slice(0, -1).join('.')
  }
}
