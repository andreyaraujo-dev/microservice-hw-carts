import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards
} from '@nestjs/common'
import { CartService } from './cart.service'
import { Cart } from './schemas/cart.schema'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Query('userEmail') userEmail?: string,
    @Query('model') model?: string
  ) {
    return this.cartService.findAll(userEmail, model)
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() cart: Cart) {
    return this.cartService.create(cart)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string) {
    return this.cartService.findById(id)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() cart: Cart) {
    return this.cartService.update(id, cart)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    return this.cartService.delete(id)
  }

  @Post('/delete-many')
  @UseGuards(JwtAuthGuard)
  async deleteMany(@Body('ids') ids: string[]) {
    return this.cartService.deleteMany(ids)
  }
}
