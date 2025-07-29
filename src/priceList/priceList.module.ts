
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceListEntity } from "./priceList.entity";
import { PriceListController } from "./priceList.controller";
import { PriceListService } from "./priceList.service";

@Module({
    imports: [TypeOrmModule.forFeature([PriceListEntity])],
    providers: [PriceListService],
    controllers: [PriceListController],
})

export class PriceListModule {}
