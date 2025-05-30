/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enums/role.enum';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':bookId')
  @Auth(Role.USER)
  create(
    @Param('bookId') bookId: string,
    @Body() createCommentDto: CreateCommentDto,
    @ActiveUser() user: UserActiveInterface,
  ) {
    return this.commentsService.create(createCommentDto, user, bookId);
  }

  @Get()
  @Auth(Role.USER)
  findAll(@ActiveUser() user: UserActiveInterface) {
    return this.commentsService.findAll(user);
  }

  @Get(':id')
  @Auth(Role.USER)
  findOne(@Param('id') id: number, @ActiveUser() user: UserActiveInterface) {
    return this.commentsService.findOne(id, user);
  }

  @Patch(':id')
  @Auth(Role.USER)
  update(
    @Param('id') id: number,
    @Body() updateCommentDto: UpdateCommentDto,
    @ActiveUser() user: UserActiveInterface,
  ) {
    return this.commentsService.update(id, updateCommentDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
