import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserSigninDto, UserSignupDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: UserSignupDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (user) throw new HttpException('user alerdy', HttpStatus.CONFLICT);

    const hashedPassword = await argon.hash(dto.password);

    return await this.prisma.user.create({
      data: {
        lastName: dto.name,
        email: dto.email,
        password: hashedPassword,
      },
    });
  }

  async signin(dto: UserSigninDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new NotFoundException('user not found!');

    const isValidPassword = await argon.verify(dto.password, user.password);
    if (!isValidPassword) throw new BadRequestException('password not match!');

    const getTokens = { at: 'asass' };
    return getTokens;
  }
}
