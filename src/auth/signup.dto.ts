
import { IsOptional, IsNotEmpty, IsString } from "class-validator";

export class SignupDto {

    @IsOptional()
    @IsString()
    fullName: string;

    @IsNotEmpty()
    phoneNumber: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    role: string;
}
