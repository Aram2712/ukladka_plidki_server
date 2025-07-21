import { Module } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { OrdersEntity } from "./orders.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([OrdersEntity])],
    controllers: [OrdersController],
    providers: [OrdersService],
})

export class OrdersModule {}
