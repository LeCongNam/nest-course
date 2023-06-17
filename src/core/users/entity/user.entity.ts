import { BaseEntity } from 'src/shared/entities/BaseEntity.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity({
  name: 'tb_user',
})
export class UserEntity extends BaseEntity {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  @PrimaryGeneratedColumn('uuid', { length: 36 })
  id: string;

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

  @ManyToOne(() => RoleEntity, (role) => role.users, {
    nullable: false,
  })
  roleId: RoleEntity;

  constructor() {
    super();
  }
}
