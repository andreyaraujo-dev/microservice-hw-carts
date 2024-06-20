import { Inject, Injectable } from '@nestjs/common'
import { ConstantKeys } from '../../config/constant-keys.enum'
import * as AWS from 'aws-sdk'

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

    return await this.s3_upload(
      file.buffer,
      this.s3Bucket,
      originalname,
      file.mimetype
    )
  }

  private async s3_upload(
    file: Buffer,
    bucket: string,
    originalName: string,
    mimetype: string
  ) {
    const params = {
      Bucket: bucket,
      Key: String(originalName),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-south-1'
      }
    }

    try {
      const awsS3 = new AWS.S3({
        credentials: {
          accessKeyId: this.accessKeyId,
          secretAccessKey: this.secretAccessKey
        }
      })
      return awsS3.upload(params).promise()
    } catch (e) {
      console.log(e)
    }
  }
}
