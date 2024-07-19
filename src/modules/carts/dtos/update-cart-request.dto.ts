import { Type } from 'class-transformer'
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNumber,
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

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  value?: number

  @IsOptional()
  image?: Express.Multer.File

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  year?: number

  @IsOptional()
  @IsEmail()
  userEmail?: string

  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  isFavorite?: boolean
}
