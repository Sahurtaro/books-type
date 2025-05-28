/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Comment } from './entities/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from '../books/books.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), BooksModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
