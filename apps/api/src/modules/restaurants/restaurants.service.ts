import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateRestaurantDto, RestaurantResponseDto, UpdateRestaurantDto } from '@saas-template/core';
import type { Restaurant } from '@saas-template/database';
import { RestaurantsRepository } from './restaurants.repository';

@Injectable()
export class RestaurantsService {
  constructor(
    private readonly restaurantsRepository: RestaurantsRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<RestaurantResponseDto[]> {
    const restaurants = await this.restaurantsRepository.findAll(userId);
    return restaurants.map((restaurant: Restaurant) => this.toResponseDto(restaurant));
  }

  async findOne(id: string, userId: string): Promise<RestaurantResponseDto> {
    const restaurant = await this.restaurantsRepository.findById(id, userId);
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }
    return this.toResponseDto(restaurant);
  }

  async create(userId: string, dto: CreateRestaurantDto): Promise<RestaurantResponseDto> {
    return this.uow.execute(async () => {
      const restaurant = await this.restaurantsRepository.create(userId, dto);
      return this.toResponseDto(restaurant);
    });
  }

  async update(id: string, userId: string, dto: UpdateRestaurantDto): Promise<RestaurantResponseDto> {
    return this.uow.execute(async () => {
      const restaurant = await this.restaurantsRepository.update(id, userId, dto);
      if (!restaurant) {
        throw new NotFoundException('Restaurant not found');
      }
      return this.toResponseDto(restaurant);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.restaurantsRepository.remove(id, userId);
      if (!deleted) {
        throw new NotFoundException('Restaurant not found');
      }
    });
  }

  private toResponseDto(restaurant: Restaurant): RestaurantResponseDto {
    return {
      id: restaurant.id,
      name: restaurant.name,
      location: restaurant.location,
      ownerId: restaurant.ownerId,
      createdAt: restaurant.createdAt,
      updatedAt: restaurant.updatedAt,
    };
  }
}
