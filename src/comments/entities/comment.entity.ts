/* eslint-disable prettier/prettier */
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
// import { Book } from '../../books/entities/book.entity';
// import { User } from '../../users/entities/user.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  content: string;
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;
  // @ManyToOne(() => Book, (book) => book.id)
  // book: Book;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userEmail', referencedColumnName: 'email' })
  user: User;

  @Column()
  userEmail: string;

  // @ManyToOne(() => User)
  // @JoinColumn({ name: 'userEmail', referencedColumnName: 'email' }) //con esto evitamos tener que pasarle la instancia del usuario para crear el comentario
  // user: User;
  // @Column()
  // userEmail: string;
  // @ManyToOne(() => User)
  // @JoinColumn({ name: 'userId', referencedColumnName: 'id' }) //con esto evitamos tener que pasarle la instancia del usuario para crear el comentario
  // user: User;
  // @Column()
  // userId: number;
}
