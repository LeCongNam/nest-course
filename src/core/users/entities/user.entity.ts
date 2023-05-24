import { Exclude, Type, plainToInstance } from 'class-transformer';
import { BaseEntityShare } from 'src/shared/entities/BaseEntity.entity';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('tb_user')
export class UserEntity extends BaseEntityShare {
  @PrimaryColumn({
    generated: 'uuid',
    nullable: false,
  })
  id: string;

  @Column({
    unique: true,
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  username: string;

  @Column({
    unique: true,
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  email: string;

  @Column({
    unique: true,
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  @Exclude({
    toClassOnly: false,
  })
  password: string;

  @Column({
    type: 'integer',
    default: 1,
  })
  @Type(() => Number)
  role: number;

  @Column({
    type: 'boolean',
    default: false,
  })
  deleted: boolean;

  constructor() {
    super();
  }

  static plainToClass<T>(this: new (...args: any[]) => T, obj: T) {
    return plainToInstance(this, obj);
  }
}
