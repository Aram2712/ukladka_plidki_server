
import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { PriceListDto } from './priceList.dto';
import { PriceListService } from "./priceList.service";

@Controller('priceList')
export class PriceListController {

    constructor(private readonly priceListService: PriceListService) {}

    @Post()
    createNewPriceList(@Body() priceListDto: PriceListDto) {
        return this.priceListService.createPrice(priceListDto);
    }

    @Get()
    getAllPrices() {
        return this.priceListService.getAllPriceLists();
    }

    @Delete(':id')
    deletePrice(@Param('id') id: number) {
        return this.priceListService.deletePrice(id);
    }
}