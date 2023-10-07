import { ConfigService } from '@nestjs/config';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly configService = new ConfigService();

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const apiKey = req.headers['api-key'];
    return apiKey !== this.configService.get('API_KEY') ? false : true;
  }
}
