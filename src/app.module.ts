import { Module } from '@nestjs/common';
import { UserModule } from '@user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), UserModule],
})
export class AppModule {}
