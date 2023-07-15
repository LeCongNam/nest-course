import { BaseEntity } from 'src/shared/entities/BaseEntity.entity';
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({
  name: 'tb_role',
})
export class RoleEntity extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column({
    unique: true,
    nullable: false,
  })
  name: string;

  @OneToMany(() => UserEntity, (user) => user.roleId, {
    cascade: ['soft-remove'],
  })
  @JoinColumn({
    name: 'users',
  })
  users: UserEntity[];

  constructor() {
    super();
  }
}
