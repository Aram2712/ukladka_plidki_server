import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class ServicesDto {
  // @IsOptional()
  // id: number

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsString()
  price: string;

  @IsOptional()
  @IsString()
  imagesPaths: string;
}
