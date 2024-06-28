import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  //proveemos el modulo para indicarle las características que tendrá la bd
  //Con esto ya se actualiza el mongo compass
  imports:[
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
    {
      name: User.name,
      schema: UserSchema
    }
  ]),
  JwtModule.register({
    global: true,
    secret: process.env.JWT_SEED,
    signOptions: { expiresIn: '6h' }, //expira e 6 horas el token
  })
]
})
export class AuthModule {}
