import { Module } from '@nestjs/common';
import { UserModule } from '@user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, UserModule],
})
export class AppModule {}
