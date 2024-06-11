import { FactoryProvider, Global, Module } from '@nestjs/common'
import { LoggerService } from './services/logger/logger'
import { ConstantKeys } from './config/constant-keys.enum'
import { SecretService } from './secret/secret.service'

const secretProviders: FactoryProvider[] = Object.values(ConstantKeys).map(
  (key: ConstantKeys): FactoryProvider => {
    return {
      inject: [SecretService],
      provide: key,
      useFactory: async (secretService: SecretService): Promise<string> =>
        secretService.fetchEnvSecret(key)
    }
  }
)

@Global()
@Module({
  providers: [LoggerService, SecretService, ...secretProviders],
  exports: [LoggerService, ...secretProviders]
})
export class SharedModule {}
