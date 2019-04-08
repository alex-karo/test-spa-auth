import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { HttpStrategy } from './http.strategy';
import { UsersService } from './users.service';
import { TokenSchema } from './schemas/token.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test', {useNewUrlParser: true}),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Token', schema: TokenSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, HttpStrategy, UsersService],
})
export class AppModule {}
