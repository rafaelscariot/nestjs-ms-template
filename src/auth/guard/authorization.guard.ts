import { ConfigService } from '@nestjs/config';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private readonly configService = new ConfigService();

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const apiKey = req.headers['api-key'];
    return apiKey === this.configService.get('API_KEY') ? true : false;
  }
}
