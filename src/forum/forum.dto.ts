import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class ForumDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
