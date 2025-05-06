/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany } from 'typeorm';
import { Book } from '../../books/entities/book.entity';

@Entity()
export class Author {
  @Column({ primary: true, generated: true })
  id: number;
  @Column()
  name: string;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
