import {
  IsBooleanString,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString
} from 'class-validator'

export class CreateCartRequestDto {
  @IsNotEmpty()
  @IsString()
  model: string

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

  @IsNotEmpty()
  @IsEmail()
  userEmail: string

  @IsBooleanString()
  @IsOptional()
  isFavorite?: boolean
}
