
import { IsNotEmpty, IsString } from "class-validator";

export class PriceListDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    price: string
}