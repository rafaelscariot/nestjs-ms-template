import { UserRoleEnum } from '@src/user/enum/user-role.enum';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class User1683404559089 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar(100)',
          },
          {
            name: 'email',
            type: 'varchar(100)',
          },
          {
            name: 'password',
            type: 'varchar(100)',
          },
          {
            name: 'role',
            type: 'enum',
            enum: [UserRoleEnum.ADMIN, UserRoleEnum.USER],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');

    await queryRunner.query('DROP EXTENSION IF EXISTS "uuid-ossp";');
  }
}
