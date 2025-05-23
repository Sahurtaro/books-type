import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
} from 'typeorm';
import { Author } from '../../authors/entities/author.entity';

@Entity('books')
export class Book {
  @Column({ primary: true, generated: true })
  id: number;
  @Column()
  title: string;
  @Column()
  stock: number;
  @Column()
  description: string;
  @Column()
  price: number;
  @Column()
  genre: string;
  @Column()
  numPages: number;
  @Column()
  pub_year: number;
  @Column()
  publisher: string;
  @Column()
  image: string;
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;
  @Column({ type: 'boolean', default: true })
  active: boolean;
  @ManyToOne(() => Author, (author) => author.id, {
    eager: true, //para traer el autor cuando se haga un findOne del book
  })
  author: Author;
}
