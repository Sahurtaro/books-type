/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */

import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
    await this.validateBookExists(bookId);

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

  async findOne(id: number, user: UserActiveInterface) {
    const comment = await this.commentRepository.findOneBy({ id });
    if (!comment) {
      throw new BadRequestException(`Comment with ID ${id} not found`);
    }
    this.validateOwnership(comment, user);
    return comment;
  }

  async update(
    id: number,
    updateCommentDto: UpdateCommentDto,
    user: UserActiveInterface,
  ) {
    await this.findOne(id, user);

    return await this.commentRepository.update(id, {
      ...updateCommentDto,
      userEmail: user.email,
    });
  }

  async remove(id: number, user: UserActiveInterface) {
    await this.findOne(id, user);

    return await this.commentRepository.softDelete({ id });
  }

  private validateOwnership(comment: Comment, user: UserActiveInterface) {
    if (user.role !== Role.ADMIN && comment.userEmail !== user.email) {
      throw new UnauthorizedException('You do not own this comment');
    }
  }

  private async validateBookExists(bookId: string) {
    const book = await this.booksRepository.findOne({
      where: { id: Number(bookId) },
    });
    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }
  }
}
