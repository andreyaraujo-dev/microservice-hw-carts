import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type CartDocument = HydratedDocument<Cart>

@Schema()
export class Cart {
  @Prop({ required: true, type: String })
  model: string

  @Prop({ type: Date })
  purchaseDate: Date

  @Prop({ required: true, type: Number })
  value: number

  @Prop({ type: String })
  imageUrl: string

  @Prop({ required: false, type: Number })
  year: number

  @Prop({ required: true, type: String })
  userEmail: string

  @Prop({ type: Date, default: Date.now })
  createdAt: Date

  @Prop({ type: Date })
  updatedAt: Date
}

export const CartSchema = SchemaFactory.createForClass(Cart)
