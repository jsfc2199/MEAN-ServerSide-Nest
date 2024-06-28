import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  //proveemos el modulo para indicarle las características que tendrá la bd
  //Con esto ya se actualiza el mongo compass
  imports:[MongooseModule.forFeature([
    {
      name: User.name,
      schema: UserSchema
    }
  ])]
})
export class AuthModule {}
