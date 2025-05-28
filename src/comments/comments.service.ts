/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { Book } from '../books/entities/book.entity';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Comment>,
  ) {}
  async create(
    createCommentDto: CreateCommentDto,
    user: UserActiveInterface,
    bookId: string,
  ) {
    const book = await this.booksRepository.findOne({
      where: { id: Number(bookId) },
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }

    return await this.commentRepository.save({
      ...createCommentDto,
      userEmail: user.email,
      bookId,
    });
  }

  async findAll(user: UserActiveInterface) {
    if (user.role === Role.ADMIN) {
      return await this.commentRepository.find();
    }
    return await this.commentRepository.find({
      where: { userEmail: user.email },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
