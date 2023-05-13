import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Logger } from '@nestjs/common';
import { UserInterface } from '@src/user/interface/user.interface';
import { DatabaseOperationEnum } from '@src/database/enum/database-operation.enum';
import { ConnectionProviderEnum } from '@src/database/enum/connection-provider.enum';
import connectionProvider from '@src/database/provider/connection.provider';
import { UserEntity } from '@src/database/entity/user.entity';

export class DatabaseSeed {
  private readonly logger = new Logger(DatabaseSeed.name);
  private connection: DataSource;

  async bootstrap() {
    this.connection = new DataSource(
      connectionProvider(
        ConnectionProviderEnum.POSTGRES_WRITE_CONNECTION,
        DatabaseOperationEnum.WRITE,
      ),
    );

    await this.connection.initialize();
  }

  async perform() {
    this.logger.log('Seed process started');

    await this.bootstrap();

    this.logger.log('Saving 10 new users');

    const userRepository = this.connection.getRepository(UserEntity);
    userRepository.save(this.createFakeUsers(10));

    this.logger.log('The database has been seeded');
  }

  createFakeUsers(count: number): UserInterface[] {
    return faker.helpers.multiple(
      () => {
        return {
          id: faker.string.uuid(),
          name: faker.person.fullName(),
          email: faker.internet.email(),
        };
      },
      {
        count,
      },
    );
  }
}

new DatabaseSeed().perform();
