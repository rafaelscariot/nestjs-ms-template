import connection from './connection.provider';
import { DatabaseOperationEnum } from '@database/enum/database-operation.enum';
import { DataSource } from 'typeorm';
import { ConnectionProviderEnum } from '@src/database/enum/connection-provider.enum';

export default new DataSource(
  connection(
    ConnectionProviderEnum.POSTGRES_WRITE_CONNECTION,
    DatabaseOperationEnum.WRITE,
  ),
);
