export class CreateCartRequestDto {
  model: string
  collection?: string
  comments?: string
  purchaseDate?: Date
  value?: number
  image?: Express.Multer.File
  year?: number
  userEmail: string
  isFavorite?: boolean
}
