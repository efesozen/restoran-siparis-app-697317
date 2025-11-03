import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export enum OrderStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export class CreateOrderDto {
  @IsUUID()
  customerId!: string;

  @IsUUID()
  restaurantId!: string;

  @IsUUID()
  menuId!: string;

  @IsNumber()
  quantity!: number;

  @IsNumber()
  totalPrice!: number;

  @IsEnum(OrderStatus)
  status!: OrderStatus;
}

export class UpdateOrderDto {
  @IsOptional()
  @IsUUID()
  customerId?: string | undefined;

  @IsOptional()
  @IsUUID()
  restaurantId?: string | undefined;

  @IsOptional()
  @IsUUID()
  menuId?: string | undefined;

  @IsOptional()
  @IsNumber()
  quantity?: number | undefined;

  @IsOptional()
  @IsNumber()
  totalPrice?: number | undefined;

  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus | undefined;
}

export class OrderResponseDto {
  id!: string;
  customerId!: string;
  restaurantId!: string;
  menuId!: string;
  quantity!: number;
  totalPrice!: number;
  status!: OrderStatus;
  createdAt!: Date;
  updatedAt!: Date;
}
