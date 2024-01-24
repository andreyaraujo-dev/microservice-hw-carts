import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CartModule } from './modules/carts/cart.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://andreyaraujodev:m9gVpyT9c7r2EX9I@hw-carts.bssub8z.mongodb.net/',
    ),
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
