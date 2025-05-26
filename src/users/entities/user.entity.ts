/* eslint-disable prettier/prettier */
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../../common/enums/role.enum';
// import { Role } from '../../common/enum/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ unique: true, nullable: false })
  email: string;
  @Column({ nullable: false, select: false })
  password: string;
  @Column({ type: 'enum', default: Role.USER, enum: Role })
  role: string;
  @DeleteDateColumn()
  deleted_at: Date;
}
