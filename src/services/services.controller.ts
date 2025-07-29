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
          destination: '/var/www/ukladka/uploads/tmp',
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
    const finalDir = '/var/www/ukladka/uploads';
    fs.mkdirSync(finalDir, { recursive: true });

    const savedFilenames: string[] = [];

    const images = files.filter(file => file.mimetype.startsWith('image/'));
    const videos = files.filter(file => file.mimetype.startsWith('video/'));

    const sortFiles = images.concat(videos);

    for (const file of sortFiles) {
      const ext = extname(file.originalname);
      const baseName = file.filename.replace(ext, '');
      const webpPath = join(finalDir, baseName + '.webp');
      const destPath = join(finalDir, file.filename);

      if (file.mimetype.startsWith('image/')) {
        try {
          await sharp(file.path).webp({ quality: 80 }).toFile(webpPath);
          fs.unlinkSync(file.path); // удаляем оригинал
          savedFilenames.push(baseName + '.webp');
        } catch (err) {
          console.error('Ошибка конвертации изображения:', err);
        }
      } else if (file.mimetype.startsWith('video/')) {
        fs.renameSync(file.path, destPath); // перемещаем в uploads
        savedFilenames.push(file.filename);
      } else {
        fs.unlinkSync(file.path); // удаляем неподдерживаемые типы
      }
    }

    const newData = {
      title: service.title,
      header: service.header,
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
