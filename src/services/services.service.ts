import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServicesEntity } from './services.entity';
import { ServicesDto } from './services.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(ServicesEntity)
    private servicesEntity: Repository<ServicesEntity>,
  ) {}

  async findAll(): Promise<ServicesEntity[]> {
    const allData = await this.servicesEntity.find();
    return allData.reverse();
  }

  async createService(service: ServicesDto): Promise<void> {
    const newService = this.servicesEntity.create(service);
    await this.servicesEntity.save(newService);
  }

  async findOne(id: number): Promise<ServicesEntity | NotFoundException> {
    const service = await this.servicesEntity.findOne({ where: { id } });
    if (!service) {
      throw new NotFoundException(`Service not found`);
    }
    return service;
  }

  async deleteService(id: number): Promise<void> {
    await this.servicesEntity.delete(id);
  }
}
