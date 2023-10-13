import {
  TypeOrmReadConnectionOptions,
  TypeOrmWriteConnectionOptions,
} from '@database/provider/typeorm-options.provider';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@database/entity/user.entity';
import { UserController } from '@user/controller/user.controller';
import { UserRepository } from '@user/repository/user.repository';
import { CreateUserService } from './service/create-user/create-user.service';
import { ConnectionProviderEnum } from '@src/database/enum/connection-provider.enum';
import { FindAllUsersService } from '@user/service/find-all-users/find-all-users.service';
import { FindUserByEmailService } from './service/find-user-by-email/find-user-by-email.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: ConnectionProviderEnum.POSTGRES_READ_CONNECTION,
      useClass: TypeOrmReadConnectionOptions,
    }),
    TypeOrmModule.forFeature(
      [UserEntity],
      ConnectionProviderEnum.POSTGRES_READ_CONNECTION,
    ),
    TypeOrmModule.forRootAsync({
      name: ConnectionProviderEnum.POSTGRES_WRITE_CONNECTION,
      useClass: TypeOrmWriteConnectionOptions,
    }),
    TypeOrmModule.forFeature(
      [UserEntity],
      ConnectionProviderEnum.POSTGRES_WRITE_CONNECTION,
    ),
  ],
  controllers: [UserController],
  providers: [
    UserRepository,
    CreateUserService,
    FindAllUsersService,
    FindUserByEmailService,
  ],
  exports: [FindUserByEmailService, UserRepository],
})
export class UserModule {}
