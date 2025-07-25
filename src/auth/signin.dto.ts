import { IsString, IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
