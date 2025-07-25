import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersEntity } from './orders.entity';
import { OrdersDto } from './orders.dto';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersEntity)
    private ordersRepository: Repository<OrdersEntity>,
  ) {}

  async getOrders(): Promise<OrdersEntity[]> {
    return this.ordersRepository.find();
  }

  async createOrder(order: OrdersDto): Promise<void> {
    const newOrder = this.ordersRepository.create({ ...order });
    await this.ordersRepository.save(newOrder);
  }

  async deleteOrder(id: number): Promise<void> {
    await this.ordersRepository.delete(id);
  }
}
