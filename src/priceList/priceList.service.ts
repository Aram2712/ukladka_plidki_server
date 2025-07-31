import { Injectable } from '@nestjs/common';
import { PriceListDto } from './priceList.dto';
import { PriceListEntity } from './priceList.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PriceListService {
  constructor(
    @InjectRepository(PriceListEntity)
    private readonly priceListRepository: Repository<PriceListEntity>,
  ) {}

  async createPrice(priceList: PriceListDto) {
    const newList = this.priceListRepository.create({ ...priceList });
    return await this.priceListRepository.save(newList);
  }

  async getAllPriceLists(): Promise<PriceListEntity[]> {
    return await this.priceListRepository.find();
  }

  async deletePrice(id: number) {
    return await this.priceListRepository.delete(id);
  }
}
