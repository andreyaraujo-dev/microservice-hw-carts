import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type CartDocument = HydratedDocument<Cart>

@Schema()
export class Cart {
  @Prop({ required: true, type: String })
  model: string

  @Prop({ required: false, type: String })
  comments?: string

  @Prop({ required: false, type: Date })
  purchaseDate?: Date

  @Prop({ required: false, type: Number })
  value?: number

  @Prop({ type: String })
  imageUrl?: string

  @Prop({ required: false, type: Number })
  year?: number

  @Prop({ required: true, type: String })
  userEmail: string

  @Prop({ required: false, type: Boolean, default: false })
  isFavorite?: boolean

  @Prop({ required: false, type: Date, default: Date.now })
  createdAt?: Date

  @Prop({ required: false, type: Date })
  updatedAt?: Date
}

export const CartSchema = SchemaFactory.createForClass(Cart)
