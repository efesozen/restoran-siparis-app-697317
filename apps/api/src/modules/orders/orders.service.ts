import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateOrderDto, OrderResponseDto, UpdateOrderDto } from '@saas-template/core';
import type { Order } from '@saas-template/database';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<OrderResponseDto[]> {
    const orders = await this.ordersRepository.findAll(userId);
    return orders.map((order: Order) => this.toResponseDto(order));
  }

  async findOne(id: string, userId: string): Promise<OrderResponseDto> {
    const order = await this.ordersRepository.findById(id, userId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return this.toResponseDto(order);
  }

  async create(userId: string, dto: CreateOrderDto): Promise<OrderResponseDto> {
    return this.uow.execute(async () => {
      const order = await this.ordersRepository.create(userId, dto);
      return this.toResponseDto(order);
    });
  }

  async update(id: string, userId: string, dto: UpdateOrderDto): Promise<OrderResponseDto> {
    return this.uow.execute(async () => {
      const order = await this.ordersRepository.update(id, userId, dto);
      if (!order) {
        throw new NotFoundException('Order not found');
      }
      return this.toResponseDto(order);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.ordersRepository.remove(id, userId);
      if (!deleted) {
        throw new NotFoundException('Order not found');
      }
    });
  }

  private toResponseDto(order: Order): OrderResponseDto {
    return {
      id: order.id,
      customerId: order.customerId,
      restaurantId: order.restaurantId,
      menuId: order.menuId,
      quantity: order.quantity,
      totalPrice: order.totalPrice,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }
}
