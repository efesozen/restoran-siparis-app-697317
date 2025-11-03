import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateMenuDto, MenuResponseDto, UpdateMenuDto } from '@saas-template/core';
import type { Menu } from '@saas-template/database';
import { MenusRepository } from './menus.repository';

@Injectable()
export class MenusService {
  constructor(
    private readonly menusRepository: MenusRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<MenuResponseDto[]> {
    const menus = await this.menusRepository.findAll(userId);
    return menus.map((menu: Menu) => this.toResponseDto(menu));
  }

  async findOne(id: string, userId: string): Promise<MenuResponseDto> {
    const menu = await this.menusRepository.findById(id, userId);
    if (!menu) {
      throw new NotFoundException('Menu not found');
    }
    return this.toResponseDto(menu);
  }

  async create(userId: string, dto: CreateMenuDto): Promise<MenuResponseDto> {
    return this.uow.execute(async () => {
      const menu = await this.menusRepository.create(userId, dto);
      return this.toResponseDto(menu);
    });
  }

  async update(id: string, userId: string, dto: UpdateMenuDto): Promise<MenuResponseDto> {
    return this.uow.execute(async () => {
      const menu = await this.menusRepository.update(id, userId, dto);
      if (!menu) {
        throw new NotFoundException('Menu not found');
      }
      return this.toResponseDto(menu);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.menusRepository.remove(id, userId);
      if (!deleted) {
        throw new NotFoundException('Menu not found');
      }
    });
  }

  private toResponseDto(menu: Menu): MenuResponseDto {
    return {
      id: menu.id,
      restaurantId: menu.restaurantId,
      itemName: menu.itemName,
      description: menu.description,
      price: menu.price,
      createdAt: menu.createdAt,
      updatedAt: menu.updatedAt,
    };
  }
}
