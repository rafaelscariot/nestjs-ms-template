import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthErrorMessageEnum } from '../enum/auth-error-message.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly configService = new ConfigService();

  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(req);

    if (!token)
      throw new UnauthorizedException(AuthErrorMessageEnum.INVALID_JWT_TOKEN);

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      });

      req['user'] = payload;
    } catch {
      throw new UnauthorizedException(AuthErrorMessageEnum.INVALID_JWT_TOKEN);
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
