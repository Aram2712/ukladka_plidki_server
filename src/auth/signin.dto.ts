
import { IsString, IsNotEmpty, IsPhoneNumber } from "class-validator";

export class SignInDto {
    @IsNotEmpty()
    @IsPhoneNumber()
    phoneNumber: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
