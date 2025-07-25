import { Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { ServicesEntity } from './services.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ServicesEntity])],
  providers: [ServicesService],
  controllers: [ServicesController],
})
export class ServicesModule {}
