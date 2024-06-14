import { Inject, Injectable } from '@nestjs/common'
import { version, name } from '../package.json'
import { ConstantKeys } from './modules/shared/config/constant-keys.enum'

@Injectable()
export class AppService {
  constructor(
    @Inject(ConstantKeys.nodeEnv) private readonly environment: string
  ) {}
  execute() {
    return {
      version,
      name,
      environment: this.environment,
      time: new Date().toISOString()
    }
  }
}
