import { api } from '@/lib/api';
import type { RestaurantResponseDto, CreateRestaurantDto, UpdateRestaurantDto } from '@saas-template/core';

export const restaurantsService = {
  async getAll(): Promise<RestaurantResponseDto[]> {
    const response = await api.get('/restaurants');
    return response.data;
  },

  async getById(id: string): Promise<RestaurantResponseDto> {
    const response = await api.get(`/restaurants/${id}`);
    return response.data;
  },

  async create(data: CreateRestaurantDto): Promise<RestaurantResponseDto> {
    const response = await api.post('/restaurants', data);
    return response.data;
  },

  async update(id: string, data: UpdateRestaurantDto): Promise<RestaurantResponseDto> {
    const response = await api.put(`/restaurants/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/restaurants/${id}`);
  },
};
