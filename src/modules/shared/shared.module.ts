import { Global, Module } from '@nestjs/common'
import { LoggerService } from './services/logger/logger'

@Global()
@Module({
  providers: [LoggerService],
  exports: [LoggerService]
})
export class SharedModule {}
