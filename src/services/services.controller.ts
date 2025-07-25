import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { extname, join } from 'path';
import { diskStorage } from 'multer';
import { ServicesService } from './services.service';
import { ServicesDto } from './services.dto';
import * as sharp from 'sharp';
import * as fs from 'fs';

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
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads/tmp',
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueName + extname(file.originalname));
        },
      }),
    }),
  )
  async createService(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() service: ServicesDto,
  ) {
    const finalDir = './uploads';
    fs.mkdirSync(finalDir, { recursive: true });

    const savedFilenames: string[] = [];

    for (const file of files) {
      const ext = extname(file.originalname);
      const baseName = file.filename.replace(ext, '');
      const filePath = join(finalDir, baseName + '.webp');
      const destPath = join(finalDir, file.filename);

      if (file.mimetype.startsWith('image/')) {
        try {
          await sharp(file.path).webp({ quality: 80 }).toFile(filePath);
          fs.unlinkSync(file.path); // удаляем оригинал
          savedFilenames.push(baseName + '.webp');
        } catch (err) {
          console.error('Ошибка конвертации изображения:', err);
        }
      } else if (file.mimetype.startsWith('video/')) {
        fs.renameSync(file.path, destPath); // перемещаем в uploads
        savedFilenames.push(file.filename);
      } else {
        fs.unlinkSync(file.path); // ненужные типы удаляем
      }
    }

    const newData = {
      title: service.title,
      description: service.description,
      price: service.price,
      imagesPaths: savedFilenames.join(','),
    };

    return this.servicesService.createService(newData);
  }

  @Delete(':id')
  deleteService(@Param('id') id: number) {
    return this.servicesService.deleteService(id);
  }
}
