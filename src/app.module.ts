import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(), //para poder usar las variables de entorno, siempre de primero
    MongooseModule.forRoot(process.env.MONGO_URI),    
    AuthModule,    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
