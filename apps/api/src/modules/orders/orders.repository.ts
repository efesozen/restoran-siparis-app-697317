import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Order } from '@saas-template/database';
import type { CreateOrderDto, UpdateOrderDto } from '@saas-template/core';

@Injectable()
export class OrdersRepository extends Repository<Order> {
  constructor(private dataSource: DataSource) {
    super(Order, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Order[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Order | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreateOrderDto): Promise<Order> {
    const order = this.create({
      ...dto,
      userId,
    });
    return this.save(order);
  }

  async update(id: string, userId: string, dto: UpdateOrderDto): Promise<Order | null> {
    const order = await this.findById(id, userId);
    if (!order) {
      return null;
    }

    Object.assign(order, dto);
    return this.save(order);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const order = await this.findById(id, userId);
    if (!order) {
      return false;
    }

    await this.softRemove(order);
    return true;
  }
}
