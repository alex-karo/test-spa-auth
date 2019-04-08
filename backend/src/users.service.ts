import { Model } from 'mongoose';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.interface';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Token') private readonly tokenModel: Model<any>,
  ) {}

  async onModuleInit() {
    const user = await this.userModel.findOne({email: 'test@example.com'});
    if (!user) {
      const newUser = new this.userModel({email: 'test@example.com', name: 'Alex'});
      await newUser.setPassword('password');
      await newUser.save();
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  findOneByToken = async (token: string): Promise<User> => {
    const tokenModel = await this.tokenModel.findOne({token});
    return this.userModel.findOneById(tokenModel.userId);
  }

  findOneByEmail = (email: string): Promise<User> => {
    return this.userModel.findOne({email});
  }
}
