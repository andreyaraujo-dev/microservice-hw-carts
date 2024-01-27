import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { CartModule } from './modules/carts/cart.module'
import { ConfigModule } from '@nestjs/config'
import { SharedModule } from './modules/shared/shared.module'

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    CartModule,
    SharedModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
