import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    @InjectModel('Token') private readonly tokenModel: Model<any>,
  ) {}
  async passwordAuth(email: string, password: string): Promise<string> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('Email not found');
    }
    const passwordIsValid = await user.checkPassword(password);
    if (passwordIsValid) {
      const token = randomBytes(32).toString('hex');
      const tokenModel = await new this.tokenModel({
        userId: user.id,
        token,
      });
      await tokenModel.save();
      return token;
    } else {
      throw new BadRequestException('Password is not match');
    }
  }

  async validateUser(token: string): Promise<{name: string, email: string}> {
    return await this.usersService.findOneByToken(token);
  }
}
