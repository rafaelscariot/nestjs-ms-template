import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthInterface } from '@src/user/interface/auth.interface';
import { AuthErrorMessageEnum } from '../enum/auth-error-message.enum';
import { FindUserByEmailService } from '@user/service/find-user-by-email/find-user-by-email.service';

@Injectable()
export class AuthService {
  private readonly configService = new ConfigService();

  constructor(
    private readonly jwtService: JwtService,
    private readonly findUserByEmailService: FindUserByEmailService,
  ) {}

  async signIn(data: AuthInterface): Promise<{ access_token: string }> {
    try {
      const { email = undefined, password = undefined } = data;

      if (!email || !password)
        throw new BadRequestException(AuthErrorMessageEnum.INVALID_PARAMS);

      const user = await this.findUserByEmailService.perform(email);

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        throw new UnauthorizedException(AuthErrorMessageEnum.INVALID_PASSWORD);

      const accessToken = await this.jwtService.signAsync(
        {
          sub: user.id,
          email: user.email,
        },
        { secret: this.configService.get('JWT_SECRET') },
      );

      return {
        access_token: accessToken,
      };
    } catch (error) {
      throw error;
    }
  }
}
