import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsModule } from './authors/authors.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'user_books',
      password: 'root',
      database: 'db_books',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthorsModule,
    BooksModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
