import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { Cart } from './schemas/cart.schema'
import { CartCustomRepository } from './cart.repository'
import { CreateCart } from './interfaces/create-cart.interface'
import { AwsS3Service } from '../shared/services/aws/aws-s3.service'
import { UpdateCart } from './interfaces/update-cart.interface'

@Injectable()
export class CartService {
  constructor(
    private readonly cartCustomRepository: CartCustomRepository,
    private readonly awsS3Service: AwsS3Service
  ) {}

  async findAll(userEmail?: string, model?: string): Promise<Cart[]> {
    return this.cartCustomRepository.findAll(userEmail, model)
  }

  async create(cart: CreateCart): Promise<Cart> {
    const dataForSave: Cart = {
      ...cart,
      imageUrl: ''
    }

    try {
      if (cart.image) {
        const response = await this.awsS3Service.uploadFile(cart.image)
        dataForSave.imageUrl = response.fileUrl
      }
      return this.cartCustomRepository.create(dataForSave)
    } catch (error) {
      console.log('ERROR ON CREATE CART: ', error)
      throw new BadRequestException(error)
    }
  }

  async findById(id: string): Promise<Cart> {
    const cart = await this.cartCustomRepository.findById(id)
    if (!cart) {
      throw new NotFoundException('Registro não encontrado, tente novamente.')
    }
    return cart
  }

  async update(id: string, cart: UpdateCart): Promise<Cart> {
    const cartAlreadyExists = await this.cartCustomRepository.findById(id)
    if (!cartAlreadyExists) {
      throw new NotFoundException('Registro não encontrado, tente novamente.')
    }

    const dataForSave: Cart = cartAlreadyExists

    if (cart.image) {
      if (cartAlreadyExists.imageUrl) {
        await this.awsS3Service.removeImage(cartAlreadyExists.imageUrl)
      }
      const response = await this.awsS3Service.uploadFile(cart.image)
      dataForSave.imageUrl = response.fileUrl
    }

    return this.cartCustomRepository.update(id, dataForSave)
  }

  async delete(id: string): Promise<any> {
    const cart = await this.cartCustomRepository.findById(id)
    if (!cart) {
      throw new NotFoundException('Registro não encontrado, tente novamente.')
    }
    return this.cartCustomRepository.delete(id)
  }

  async deleteMany(ids: string[]): Promise<any> {
    return this.cartCustomRepository.deleteMany(ids)
  }
}
