import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { MongoExceptionFilter } from './modules/shared/filters/mongoose.filter'
import { LoggerService } from './modules/shared/services/logger/logger'

async function bootstrap() {
  const PORT = process.env.PORT || 3000
  const PUBLIC_URL = process.env.PUBLIC_URL || ''

  const app = await NestFactory.create(AppModule, { cors: true })
  app.useGlobalFilters(new MongoExceptionFilter())
  const loggerService = new LoggerService()
  loggerService.setContext('Server')
  app.useLogger(loggerService)

  await app.listen(PORT, () => {
    loggerService.log(`🚀 Listen on ${PUBLIC_URL}:${PORT}`)
  })
}
bootstrap()
