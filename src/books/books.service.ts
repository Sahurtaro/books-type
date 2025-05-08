import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from '../authors/entities/author.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const author = await this.authorRepository.findOneBy({
      name: createBookDto.author,
    });
    if (!author) {
      throw new BadRequestException('Author not found');
    }
    return await this.bookRepository.save({ ...createBookDto, author });
  }

  async findAll() {
    return await this.bookRepository.find();
  }

  async findOne(id: number) {
    return await this.bookRepository.findOneBy({ id });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const author = await this.authorRepository.findOneBy({
      name: updateBookDto.author,
    });

    if (!author) {
      throw new BadRequestException('Author not found');
    }
    return await this.bookRepository.update(id, { ...updateBookDto, author });
  }

  async remove(id: number) {
    return await this.bookRepository.softDelete(id);
  }
}
