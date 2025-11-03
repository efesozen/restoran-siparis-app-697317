import { api } from '@/lib/api';
import type { MenuResponseDto, CreateMenuDto, UpdateMenuDto } from '@saas-template/core';

export const menusService = {
  async getAll(): Promise<MenuResponseDto[]> {
    const response = await api.get('/menus');
    return response.data;
  },

  async getById(id: string): Promise<MenuResponseDto> {
    const response = await api.get(`/menus/${id}`);
    return response.data;
  },

  async create(data: CreateMenuDto): Promise<MenuResponseDto> {
    const response = await api.post('/menus', data);
    return response.data;
  },

  async update(id: string, data: UpdateMenuDto): Promise<MenuResponseDto> {
    const response = await api.put(`/menus/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/menus/${id}`);
  },
};
