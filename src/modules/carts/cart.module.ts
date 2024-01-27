import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Cart, CartSchema } from './schemas/cart.schema'
import { CartService } from './cart.service'
import { CartController } from './cart.controller'
import { CartCustomRepository } from './cart.repository'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }])
  ],
  controllers: [CartController],
  providers: [CartService, CartCustomRepository]
})
export class CartModule {}
