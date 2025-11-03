import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { Restaurant } from './restaurant.entity';

@Entity({ name: 'menus' })
export class Menu extends BaseEntity {
  @Column({ name: 'item_name' })
  itemName!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'integer' })
  price!: number;


@Column({ name: 'restaurant_id' })
  restaurantId!: string;

  @Index('idx_menus_restaurant_id')
  @ManyToOne('Restaurant', 'menus')
  @JoinColumn({ name: 'restaurant_id' })
  restaurant!: Restaurant;
}
