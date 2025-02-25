import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '@/shared/infra/typeorm/entities/AbstractEntity';

@Entity('users')
export class User extends AbstractEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;
}
