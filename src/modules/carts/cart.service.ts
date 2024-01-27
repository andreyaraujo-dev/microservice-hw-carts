import { Injectable, NotFoundException } from '@nestjs/common'
import { Cart } from './schemas/cart.schema'
import { CartCustomRepository } from './cart.repository'

@Injectable()
export class CartService {
  constructor(private readonly cartCustomRepository: CartCustomRepository) {}

  async findAll(): Promise<Cart[]> {
    return this.cartCustomRepository.findAll()
  }

  async create(cart: Cart): Promise<Cart> {
    return this.cartCustomRepository.create(cart)
  }

  async findById(id: string): Promise<Cart> {
    const cart = await this.cartCustomRepository.findById(id)
    if (!cart) {
      throw new NotFoundException('Registro não encontrado, tente novamente.')
    }
    return cart
  }

  async update(id: string, cart: Cart): Promise<Cart> {
    const cartAlreadyExists = await this.cartCustomRepository.findById(id)
    if (!cartAlreadyExists) {
      throw new NotFoundException('Registro não encontrado, tente novamente.')
    }
    return this.cartCustomRepository.update(id, cart)
  }

  async delete(id: string): Promise<any> {
    const cart = await this.cartCustomRepository.findById(id)
    if (!cart) {
      throw new NotFoundException('Registro não encontrado, tente novamente.')
    }
    return this.cartCustomRepository.delete(id)
  }
}
