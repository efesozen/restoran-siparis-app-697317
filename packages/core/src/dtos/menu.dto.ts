import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export class CreateMenuDto {
  @IsUUID()
  restaurantId!: string;

  @IsString()
  @MinLength(1)
  itemName!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  price!: number;
}

export class UpdateMenuDto {
  @IsOptional()
  @IsUUID()
  restaurantId?: string | undefined;

  @IsOptional()
  @IsString()
  @MinLength(1)
  itemName?: string | undefined;

  @IsOptional()
  @IsOptional()
  @IsString()
  description?: string | undefined;

  @IsOptional()
  @IsNumber()
  price?: number | undefined;
}

export class MenuResponseDto {
  id!: string;
  restaurantId!: string;
  itemName!: string;
  description?: string;
  price!: number;
  createdAt!: Date;
  updatedAt!: Date;
}
