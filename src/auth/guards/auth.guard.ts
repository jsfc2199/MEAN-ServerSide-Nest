import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt.payload';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {   
    const request = context.switchToHttp().getRequest(); //tenemos la url y mas información
    const token = this.extractTokenFromHeader(request); //extraemos el toquen de la request

    if (!token) {
      throw new UnauthorizedException('No bearer token in request');
    }

    try {
      //si el toquen fue generado con una semilla diferente, falla todo
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        token,
        {
          secret: process.env.JWT_SEED
        }
      );
      console.log({payload})
      request['user'] = payload.id;
      
    } catch (error) {
      throw new UnauthorizedException();
    }
    return Promise.resolve(true);
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}


