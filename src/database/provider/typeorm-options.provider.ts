import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DatabaseOperationEnum } from '@database/enum/database-operation.enum';
import connection from '@src/database/provider/connection.provider';
import { ConnectionProviderEnum } from '@src/database/enum/connection-provider.enum';

@Injectable()
export class TypeOrmReadConnectionOptions implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      ...connection(
        ConnectionProviderEnum.POSTGRES_READ_CONNECTION,
        DatabaseOperationEnum.READ,
      ),
      logging: false,
      synchronize: false,
    };
  }
}

@Injectable()
export class TypeOrmWriteConnectionOptions implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      ...connection(
        ConnectionProviderEnum.POSTGRES_WRITE_CONNECTION,
        DatabaseOperationEnum.WRITE,
      ),
      logging: false,
      synchronize: false,
    };
  }
}
