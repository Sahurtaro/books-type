import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Auth(Role.ADMIN)
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Auth(Role.USER)
  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Auth(Role.USER)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.booksService.findOne(+id);
  }

  @Auth(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }
  @Auth(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.booksService.remove(id);
  }
}
