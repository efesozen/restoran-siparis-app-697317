import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Menu } from '@saas-template/database';
import type { CreateMenuDto, UpdateMenuDto } from '@saas-template/core';

@Injectable()
export class MenusRepository extends Repository<Menu> {
  constructor(private dataSource: DataSource) {
    super(Menu, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Menu[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Menu | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreateMenuDto): Promise<Menu> {
    const menu = this.create({
      ...dto,
      userId,
    });
    return this.save(menu);
  }

  async update(id: string, userId: string, dto: UpdateMenuDto): Promise<Menu | null> {
    const menu = await this.findById(id, userId);
    if (!menu) {
      return null;
    }

    Object.assign(menu, dto);
    return this.save(menu);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const menu = await this.findById(id, userId);
    if (!menu) {
      return false;
    }

    await this.softRemove(menu);
    return true;
  }
}
