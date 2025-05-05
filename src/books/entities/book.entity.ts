import { Column, CreateDateColumn, DeleteDateColumn, Entity } from 'typeorm';

@Entity('books')
export class Book {
  save() {
    throw new Error('Method not implemented.');
  }
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
}
