import { BaseEntity } from 'src/shared/entities/BaseEntity.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../constant';
import { RoleEntity } from './role.entity';

@Entity({
  name: 'tb_user',
})
export class UserEntity extends BaseEntity {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  @PrimaryGeneratedColumn('uuid', { length: 36 })
  id?: string;

  @Column({
    unique: true,
    nullable: false,
  })
  userName: string;

  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  address: string;

  @Column({
    unique: true,
    nullable: true,
  })
  phone: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToOne(() => RoleEntity, (role) => role.users, {
    nullable: false,
    lazy: true,
  })
  @JoinColumn({
    name: 'roleId',
  })
  @Column({
    type: 'integer',
    default: Role.MEMBER,
  })
  roleId: number;

  constructor() {
    super();
  }
}
