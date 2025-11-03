import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Restaurant } from '@saas-template/database';
import type { CreateRestaurantDto, UpdateRestaurantDto } from '@saas-template/core';

@Injectable()
export class RestaurantsRepository extends Repository<Restaurant> {
  constructor(private dataSource: DataSource) {
    super(Restaurant, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Restaurant[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Restaurant | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreateRestaurantDto): Promise<Restaurant> {
    const restaurant = this.create({
      ...dto,
      userId,
    });
    return this.save(restaurant);
  }

  async update(id: string, userId: string, dto: UpdateRestaurantDto): Promise<Restaurant | null> {
    const restaurant = await this.findById(id, userId);
    if (!restaurant) {
      return null;
    }

    Object.assign(restaurant, dto);
    return this.save(restaurant);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const restaurant = await this.findById(id, userId);
    if (!restaurant) {
      return false;
    }

    await this.softRemove(restaurant);
    return true;
  }
}
