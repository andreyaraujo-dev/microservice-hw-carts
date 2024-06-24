import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { CartService } from './cart.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { CreateCartRequestDto } from './dtos/create-cart-request.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { UpdateCartRequestDto } from './dtos/update-cart-request.dto'

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
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() cart: CreateCartRequestDto,
    @UploadedFile() image: Express.Multer.File
  ) {
    return this.cartService.create({ ...cart, image })
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string) {
    return this.cartService.findById(id)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @UploadedFile() image: Express.Multer.File,
    @Body() cart: UpdateCartRequestDto
  ) {
    return this.cartService.update(id, { ...cart, image })
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
