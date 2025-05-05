/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsInt, IsNotEmpty, IsString, Min, MinLength } from 'class-validator';

export class CreateBookDto {
  @IsString({ message: 'El campo de nombre debe ser un string' })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty()
  //   @ApiProperty({
  //     title: 'The title of the book',
  //   })
  title: string;
  //   @ApiProperty({
  //     description: 'The description of the book',
  //   })
  @IsString()
  @MinLength(5)
  description: string;
  @IsInt()
  @Min(0, { message: 'El stock debe ser 0 o más' })
  @IsNotEmpty()
  //   @ApiProperty({
  //     description: 'The stock of the book',
  //   })
  stock: number;
  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  // //   @ApiProperty({
  // //     description: 'The author of the book',
  // //   })
  author: string;
  @IsInt()
  @Min(5)
  @IsNotEmpty()
  //   @ApiProperty({
  //     description: 'The price of the book',
  //   })
  price: number;
  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  //   @ApiProperty({
  //     description: 'The genre of the book',
  //   })
  genre: string;
  @IsString()
  @IsNotEmpty()
  //   @ApiProperty({
  //     description: 'The language in which the book is written',
  //   })
  language: string;
  @IsInt()
  @Min(20)
  @IsNotEmpty()
  //   @ApiProperty({
  //     description: 'The number of pages in the book',
  //   })
  numPages: number;
  @IsInt()
  @IsNotEmpty()
  //   @ApiProperty({
  //     description: 'The year the book was published',
  //   })
  pub_year: number;
  @IsString()
  //   @ApiProperty({
  //     description: 'The publisher of the book',
  //   })
  publisher: string;
  @IsString()
  //   @ApiProperty({
  //     description: 'The image for the book',
  //   })
  image: string;

  //   @ApiProperty({
  //     description: 'If the book is active or not',
  //   })
}
