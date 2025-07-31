import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServicesEntity } from './services.entity';
import { ServicesDto } from './services.dto';
import { AuthEntity } from "../auth/auth.entity";

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(ServicesEntity)
    private servicesEntity: Repository<ServicesEntity>,
    @InjectRepository(AuthEntity)
    private authRepository: Repository<AuthEntity>,
  ) {}

  async findAll(): Promise<ServicesEntity[]> {
    const allData = await this.servicesEntity.find();
    return allData.reverse();
  }

  async createService(service: ServicesDto): Promise<void> {
    const newService = this.servicesEntity.create(service);
    await this.servicesEntity.save(newService);
    await this.authRepository
      .createQueryBuilder()
      .update()
      .set({ isLookedLastNews: true })
      .execute();
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

  async markNewsAsRead(userId: number): Promise<void> {
    await this.authRepository.update(userId, { isLookedLastNews: false });
  }
}
