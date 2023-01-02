import { IsEmail, IsNotEmpty, IsString, Min } from 'class-validator';

export class UserSignupDto {
  @IsString()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
