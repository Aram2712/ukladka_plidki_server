import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class OrdersDto {
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10))
  square: number;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  imagesPath: string;
}
