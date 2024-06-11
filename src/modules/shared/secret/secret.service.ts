import { Injectable } from '@nestjs/common'

import { ConstantKeys } from '../config/constant-keys.enum'
import { LoggerService } from '../services/logger/logger'

@Injectable()
export class SecretService {
  constructor(private loggerService: LoggerService) {
    this.loggerService.setContext(SecretService.name)
  }

  async fetchEnvSecret(key: ConstantKeys): Promise<string> {
    this.loggerService.debug(`Fetching secret ${key}`)

    const secret = this.fetchEnvVar(key)

    if (typeof secret === 'undefined') {
      throw new Error(`SECRET "${key}" WAS NOT FOUND!`)
    }

    this.loggerService.debug(`${key} resolved`)
    return secret
  }

  private fetchEnvVar(key: ConstantKeys): string | undefined {
    if (key in process.env) {
      return process.env[key]
    }

    return undefined
  }
}
