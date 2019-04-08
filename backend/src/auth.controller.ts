import { Post, Controller, ValidationPipe, UsePipes, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { IsEmail, IsString } from 'class-validator';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from './current-user';
import { User } from './schemas/user.schema';

export class SignInPasswordDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('password')
  async passwordAuth(@Body() params: SignInPasswordDto): Promise<{token: string}> {
    return {
      token: await this.appService.passwordAuth(params.email, params.password),
    };
  }

  @UseGuards(AuthGuard('bearer'))
  @Get('current')
  getCurrentUser(@CurrentUser() user: User) {
    const {email, name} = user;
    return {
      email,
      name,
    };
  }
}
