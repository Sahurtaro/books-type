/* eslint-disable prettier/prettier */
import { RegisterDto } from './dto/register.dto';
import { UsersService } from './../users/users.service';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly UsersService: UsersService) {}

  async register({ name, email, password }: RegisterDto) {
    const user = await this.UsersService.findOneByEmail(email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    return await this.UsersService.create({ name, email, password });
  }

  login() {
    return 'login';
  }
}
