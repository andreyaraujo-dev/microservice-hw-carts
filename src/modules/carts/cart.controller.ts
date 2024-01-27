import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common'
import { CartService } from './cart.service'
import { Cart } from './schemas/cart.schema'

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async findAll(@Query('userEmail') userEmail?: string) {
    return this.cartService.findAll(userEmail)
  }

  @Post()
  async create(@Body() cart: Cart) {
    return this.cartService.create(cart)
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.cartService.findById(id)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() cart: Cart) {
    return this.cartService.update(id, cart)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.cartService.delete(id)
  }
}
