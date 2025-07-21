
import {
    Controller,
    Post,
    Body,
    Param, Delete,
    Get,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { OrdersService } from "./orders.service";
import { OrdersDto } from "./orders.dto";

@Controller("orders")
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Get()
    getOrders() {
        return this.ordersService.getOrders();
    }

    @Post('create')
    @UseInterceptors(
        FilesInterceptor('images', 10, {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    cb(null, uniqueName + extname(file.originalname));
                },
            }),
        }),
    )

    createOrders(
        @Body() order: OrdersDto,
        @UploadedFiles() files: Express.Multer.File[]
        ) {
        const savedData = {
            phoneNumber: order.phoneNumber,
            square: order.square,
            imagesPath: files.map((file) => file.filename).join(',') || '',
        };

        return this.ordersService.createOrder(savedData);
    }

    @Delete('delete/:id')
    deleteOrder(@Param('id') id: number) {
        return this.ordersService.deleteOrder(id);
    }
}
