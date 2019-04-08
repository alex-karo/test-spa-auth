import { Model } from 'mongoose';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Token } from './schemas/token.schema';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Token') private readonly tokenModel: Model<Token>,
  ) {}

  async onModuleInit() {
    const user = await this.userModel.findOne({email: 'test@example.com'});
    if (!user) {
      const newUser = new this.userModel({email: 'test@example.com', name: 'Alex'});
      await newUser.setPassword('password');
      await newUser.save();
    }
  }

  findOneByToken = async (token: string): Promise<User> => {
    const tokenModel = await this.tokenModel.findOne({token});
    return this.userModel.findById(tokenModel.userId).exec();
  }

  findOneByEmail = (email: string): Promise<User> => {
    return this.userModel.findOne({email}).exec();
  }
}
