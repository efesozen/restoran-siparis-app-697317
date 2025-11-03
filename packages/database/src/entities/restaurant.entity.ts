import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { User } from './user.entity';

@Entity({ name: 'restaurants' })
export class Restaurant extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  location!: string;


@Column({ name: 'owner_id' })
  ownerId!: string;

  @Index('idx_restaurants_owner_id')
  @ManyToOne('User', 'restaurants')
  @JoinColumn({ name: 'owner_id' })
  user!: User;
}
