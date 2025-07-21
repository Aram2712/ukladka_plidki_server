
import { Controller, Get, Post, Body, Put, Delete, Param, UseInterceptors, UploadedFiles } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { extname } from 'path';
import { diskStorage } from 'multer';
import { ServicesService } from "./services.service";
import { ServicesDto } from "./services.dto";

@Controller('services')
export class ServicesController {

    constructor(private servicesService: ServicesService) {}

    @Get()
    getServices() {
        return this.servicesService.findAll();
    }

    @Get(':id')
    getCurrentService(@Param('id') id: number) {
        return this.servicesService.findOne(id);
    }

    @Post()
    @UseInterceptors(
        FilesInterceptor('photos', 10, {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    cb(null, uniqueName + extname(file.originalname));
                },
            }),
        }),
    )

    createService(@UploadedFiles() files: Express.Multer.File[], @Body() service: ServicesDto) {
        const newData = {
            title: service.title,
            description: service.description,
            price: service.price,
            imagesPaths: files.map((file) => file.filename).join(',') || '',
        }

        return this.servicesService.createService(newData);
    }

    @Delete(':id')
    deleteService(@Param('id') id: number) {
        return this.servicesService.deleteService(id);
    }
}
