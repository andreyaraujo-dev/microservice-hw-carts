import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { MongoExceptionFilter } from './modules/shared/filters/mongoose.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new MongoExceptionFilter())
  await app.listen(3000)
}
bootstrap()
