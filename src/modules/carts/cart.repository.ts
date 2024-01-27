import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { Cart } from './schemas/cart.schema'
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class CartCustomRepository {
  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}

  async findAll(): Promise<Cart[]> {
    return this.cartModel.find().exec()
  }

  async create(cart: Cart): Promise<Cart> {
    const cartCreated = new this.cartModel(cart)
    return cartCreated.save()
  }

  async findById(id: string): Promise<Cart | null> {
    return this.cartModel.findById(id).exec()
  }

  async update(id: string, cart: Cart): Promise<Cart> {
    return this.cartModel.findByIdAndUpdate(id, cart, { new: true }).exec()
  }

  async delete(id: string): Promise<any> {
    return this.cartModel.findByIdAndDelete(id).exec()
  }
}
