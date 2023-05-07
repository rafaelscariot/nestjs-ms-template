import { DatabaseOperationEnum } from '@database/enum/database-operation.enum';
import { DataSourceOptions } from 'typeorm';

// needed for build
import * as dotenv from 'dotenv';
dotenv.config();

export default (
  name: string,
  operation: DatabaseOperationEnum,
): DataSourceOptions => {
  return {
    type: 'postgres',
    name,
    url:
      operation === DatabaseOperationEnum.WRITE
        ? process.env.POSTGRES_WRITE_DATABASE_URL
        : process.env.POSTGRES_READ_DATABASE_URL,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    migrations: [__dirname + '/../**/*.migration.{js,ts}'],
  };
};
