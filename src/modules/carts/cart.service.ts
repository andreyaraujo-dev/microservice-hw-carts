import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Cart } from './schemas/cart.schema'
import { Model } from 'mongoose'

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}

  async findAll(): Promise<Cart[]> {
    return this.cartModel.find().exec()
  }

  async create(cart: Cart): Promise<Cart> {
    const cartCreated = new this.cartModel(cart)
    return cartCreated.save()
  }

  async findById(id: string): Promise<Cart> {
    const cart = await this.cartModel.findById(id).exec()
    if (!cart) {
      throw new NotFoundException('Cart not found')
    }
    return cart
  }

  async update(id: string, cart: Cart): Promise<Cart> {
    const cartAlreadyExists = await this.cartModel.findById(id).exec()
    if (!cartAlreadyExists) {
      throw new NotFoundException('Cart not found')
    }
    return this.cartModel.findByIdAndUpdate(id, cart).exec()
  }

  async delete(id: string): Promise<any> {
    const cart = await this.cartModel.findById(id).exec()
    if (!cart) {
      throw new NotFoundException('Cart not found')
    }
    return this.cartModel.findByIdAndDelete(id).exec()
  }
}
