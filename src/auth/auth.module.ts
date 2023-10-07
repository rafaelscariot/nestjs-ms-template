import { Module } from '@nestjs/common';
import { UserModule } from '@src/user/user.module';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '7200s' },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
