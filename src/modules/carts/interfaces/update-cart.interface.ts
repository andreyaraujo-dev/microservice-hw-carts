export interface UpdateCart {
  model?: string
  comments?: string
  purchaseDate?: Date
  value?: number
  image?: Express.Multer.File
  year?: number
  userEmail?: string
  isFavorite?: boolean
}
