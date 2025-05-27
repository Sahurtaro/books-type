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
import { Book } from '../../books/entities/book.entity';
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
  user: User; //de esta manera no se instancia el usuario completo, solo se guarda la referencia al email

  @Column()
  userEmail: string;

  @ManyToOne(() => Book)
  @JoinColumn({ name: 'bookId', referencedColumnName: 'id' })
  book: Book; //de esta manera no se instancia el libro completo, solo se guarda la referencia al id
  @Column()
  bookId: string;
}
