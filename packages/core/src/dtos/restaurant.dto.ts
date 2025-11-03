import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  @MinLength(1)
  name!: string;

  @IsString()
  @MinLength(1)
  location!: string;

  @IsUUID()
  ownerId!: string;
}

export class UpdateRestaurantDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string | undefined;

  @IsOptional()
  @IsString()
  @MinLength(1)
  location?: string | undefined;

  @IsOptional()
  @IsUUID()
  ownerId?: string | undefined;
}

export class RestaurantResponseDto {
  id!: string;
  name!: string;
  location!: string;
  ownerId!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
