/* eslint-disable prettier/prettier */
import { IsString, MinLength } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  @MinLength(5)
  name: string;
}
