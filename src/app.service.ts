import { Injectable } from '@nestjs/common'
import { version, name } from '../package.json'

@Injectable()
export class AppService {
  execute() {
    return {
      version,
      name,
      environment: process.env.NODE_ENV,
      time: new Date().toISOString()
    }
  }
}
