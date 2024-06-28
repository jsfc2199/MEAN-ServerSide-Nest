import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
     @InjectModel(User.name) 
     private userModel: Model<User>,
  ){}

  create(createUserDto: CreateUserDto): Promise<User> {    
    try {
      //Forma rápida de crear un usuario
    const user = new this.userModel(createUserDto)
    return user.save();
    //TODO 1 . Encriptar contraseña

    //TODO 2. Guardar usuario

    //TODO 3. Generar JWT

    } catch (error) {
      if(error. code === 11000) {
        throw new BadRequestException(`${createUserDto.email} already exists`)
      }
      throw new InternalServerErrorException('Something bad happen')
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
