import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { Cart } from './schemas/cart.schema'
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class CartCustomRepository {
  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}

  async findAll(userEmail?: string, model?: string): Promise<Cart[]> {
    const query = this.cartModel.find()
    if (userEmail) query.where('userEmail', userEmail)
    if (model) {
      const regex = new RegExp(`^${model}|${model}$`, 'i')
      query.where('model', model).regex(regex)
    }
    return query.exec()
  }

  async create(cart: Cart): Promise<Cart> {
    const cartCreated = new this.cartModel(cart)
    return cartCreated.save()
  }

  async findById(id: string): Promise<Cart | null> {
    return this.cartModel.findById(id).exec()
  }

  async update(id: string, cart: Partial<Cart>): Promise<Cart> {
    return this.cartModel.findByIdAndUpdate(id, cart, { new: true }).exec()
  }

  async delete(id: string): Promise<any> {
    return this.cartModel.findByIdAndDelete(id).exec()
  }

  async deleteMany(ids: string[]): Promise<any> {
    return this.cartModel.deleteMany({ _id: ids }).exec()
  }

  async findByIds(ids: string[]): Promise<Cart[]> {
    return this.cartModel.find({ _id: { $in: ids } }).exec()
  }

  async favoriteById(id: string): Promise<Cart> {
    return this.cartModel
      .findByIdAndUpdate(id, { isFavorite: true }, { new: true })
      .exec()
  }
}
