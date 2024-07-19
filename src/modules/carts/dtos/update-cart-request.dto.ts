import {
  IsBooleanString,
  IsDateString,
  IsEmail,
  IsNumberString,
  IsOptional,
  IsString
} from 'class-validator'

export class UpdateCartRequestDto {
  @IsOptional()
  @IsString()
  model?: string

  @IsString()
  @IsOptional()
  collection?: string

  @IsString()
  @IsOptional()
  comments?: string

  @IsDateString()
  @IsOptional()
  purchaseDate?: Date

  @IsNumberString()
  @IsOptional()
  value?: number

  @IsOptional()
  image?: Express.Multer.File

  @IsNumberString()
  @IsOptional()
  year?: number

  @IsOptional()
  @IsEmail()
  userEmail?: string

  @IsBooleanString()
  @IsOptional()
  isFavorite?: boolean
}
