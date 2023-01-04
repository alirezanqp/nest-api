import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User as UserModel } from '@prisma/client';
import { UserSigninDto, UserSignupDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() userSignupDto: UserSignupDto): Promise<UserModel> {
    return this.authService.signup(userSignupDto);
  }

  @Post('signin')
  signin(@Body() userSigninDto: UserSigninDto) {
    return this.authService.signin(userSigninDto);
  }
}
