/* eslint-disable prettier/prettier */
import { RegisterDto } from './dto/register.dto';
import { UsersService } from './../users/users.service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ name, email, password }: RegisterDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    return await this.usersService.create({
      name,
      email,
      password: await bcryptjs.hash(password, 10),
    });
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findOneByEmailWithPassword(
      loginDto.email,
    );

    if (!user) {
      throw new UnauthorizedException('Email is wrong');
    }
    const isPasswordValid = await bcryptjs.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Password is wrong');
    }
    const payload = { email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload);
    return { token, email: loginDto.email };
  }

  async profile({ email, role }: { email: string; role: string }) {
    if (role !== 'admin') {
      throw new UnauthorizedException('You are not authorized');
    }
    return await this.usersService.findOneByEmail(email);
  }
}
