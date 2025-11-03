import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { Restaurant } from './restaurant.entity';
import type { Menu } from './menu.entity';
import type { User } from './user.entity';

@Entity({ name: 'orders' })
export class Order extends BaseEntity {
  @Column({ type: 'integer' })
  quantity!: number;

  @Column({ type: 'integer', name: 'total_price' })
  totalPrice!: number;

  @Column({ type: 'enum', enum: ['PENDING', 'COMPLETED', 'CANCELLED'] })
  @Index('idx_orders_status')
  status!: 'PENDING' | 'COMPLETED' | 'CANCELLED';


@Column({ name: 'customer_id' })
  customerId!: string;

  @Index('idx_orders_customer_id')
  @ManyToOne('User', 'orders')
  @JoinColumn({ name: 'customer_id' })
  user!: User;

  @Column({ name: 'restaurant_id' })
  restaurantId!: string;

  @Index('idx_orders_restaurant_id')
  @ManyToOne('Restaurant', 'orders')
  @JoinColumn({ name: 'restaurant_id' })
  restaurant!: Restaurant;

  @Column({ name: 'menu_id' })
  menuId!: string;

  @Index('idx_orders_menu_id')
  @ManyToOne('Menu', 'orders')
  @JoinColumn({ name: 'menu_id' })
  menu!: Menu;
}
