/* eslint-disable prettier/prettier */

import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @Transform(({ value }: { value: string }) => value.trim())
  @IsString()
  @MinLength(3)
  name: string;

  @IsEmail()
  email: string;

  @Transform(({ value }: { value: string }) => value.trim())
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
