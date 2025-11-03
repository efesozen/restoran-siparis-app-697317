import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from '@saas-template/database';
import { DatabaseModule } from '@/core/database/database.module';
import { MenusController } from './menus.controller';
import { MenusService } from './menus.service';
import { MenusRepository } from './menus.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Menu]),
    DatabaseModule,
  ],
  controllers: [MenusController],
  providers: [MenusService, MenusRepository],
  exports: [MenusService],
})
export class MenusModule {}
