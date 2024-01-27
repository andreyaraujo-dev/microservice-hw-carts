import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { CartModule } from './modules/carts/cart.module'

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://hw_carts:XiXpRZaZdk47ybf5rzKu@hw-carts.bssub8z.mongodb.net/hw_carts?retryWrites=true&w=majority'
    ),
    CartModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
