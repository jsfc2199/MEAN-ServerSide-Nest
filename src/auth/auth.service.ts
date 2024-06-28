import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';

import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt.payload';
import { LoginResponse } from './interfaces/login-response';
import { CreateUserDto, LoginDto, RegisterUserDto, UpdateAuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      // 1 . Encriptar contraseña
      const { password, ...userData } = createUserDto;

      const newUser = new this.userModel({
        password: bcryptjs.hashSync(password, 10),
        ...userData,
      });

      //TODO 2. Guardar usuario

      //TODO 3. Generar JWT


      await newUser.save();
      const {password:_, ...user} = newUser.toJSON() //del retorno borramos la contraseña para que no sea visible el hash

      return user
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`${createUserDto.email} already exists`);
      }
      throw new InternalServerErrorException('Something bad happen');
    }
  }

  async register(registerUserDto: RegisterUserDto): Promise<LoginResponse>{
    
    const user = await this.create(registerUserDto)
    
    return {
      user,
      token: this.getJWT({ id: user._id})
    }
  }

  async login(loginDto: LoginDto): Promise<LoginResponse>{

    const {email, password} = loginDto
    const user = await this.userModel.findOne({email}) //buscamos el usuario por id

    if(!user) throw new UnauthorizedException('Not valid credentials - email')

    if(!bcryptjs.compareSync(password, user.password)) throw new UnauthorizedException('Not valid credentials - password')

    const {password:_, ...rest} = user.toJSON()
    //token de acceso
    return {
      user: rest,
      token: this.getJWT({id: user.id})
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

  //se genera token con el servicio propio de jwt
  getJWT(payload: JwtPayload ){
    const token = this.jwtService.sign(payload)
    return token;
  }
}
