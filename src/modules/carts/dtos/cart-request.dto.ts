export class CartRequestDto {
  model: string
  comments?: string
  purchaseDate?: Date
  value?: number
  image?: Buffer
  year?: number
  userEmail: string
  isFavorite?: boolean
}
