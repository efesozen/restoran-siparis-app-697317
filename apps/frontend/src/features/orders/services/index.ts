import { api } from '@/lib/api';
import type { OrderResponseDto, CreateOrderDto, UpdateOrderDto } from '@saas-template/core';

export const ordersService = {
  async getAll(): Promise<OrderResponseDto[]> {
    const response = await api.get('/orders');
    return response.data;
  },

  async getById(id: string): Promise<OrderResponseDto> {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  async create(data: CreateOrderDto): Promise<OrderResponseDto> {
    const response = await api.post('/orders', data);
    return response.data;
  },

  async update(id: string, data: UpdateOrderDto): Promise<OrderResponseDto> {
    const response = await api.put(`/orders/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/orders/${id}`);
  },
};
