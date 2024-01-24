import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from './schemas/cart.schema';
import { Model } from 'mongoose';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}

  async findAll(): Promise<Cart[]> {
    return this.cartModel.find().exec();
  }

  async create(cart: Cart): Promise<Cart> {
    const cartCreated = new this.cartModel(cart);
    return cartCreated.save();
  }

  async findById(id: string): Promise<Cart> {
    // TODO: caso o documento nao exista nao é retornado erro
    return this.cartModel.findById(id).exec();
  }

  async update(id: string, cart: Cart): Promise<Cart> {
    //TODO: apo atualizar o documento retornado nao é o atualizado
    return this.cartModel.findByIdAndUpdate(id, cart).exec();
  }

  async delete(id: string): Promise<any> {
    // TODO: caso o documento já tenha sido excluido nao é retornado erro
    return this.cartModel.findByIdAndDelete(id).exec();
  }
}
