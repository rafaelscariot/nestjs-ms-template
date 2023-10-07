import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Logger } from '@nestjs/common';
import { userFixture } from '@test/fixture/user.fixture';
import { UserRoleEnum } from '@src/user/enum/user-role.enum';
import { UserEntity } from '@src/database/entity/user.entity';
import connectionProvider from '@src/database/provider/connection.provider';
import { DatabaseOperationEnum } from '@src/database/enum/database-operation.enum';
import { ConnectionProviderEnum } from '@src/database/enum/connection-provider.enum';

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
    await this.createFakeUsers();

    this.logger.log('The database has been seeded');
  }

  async createFakeUsers(): Promise<void> {
    const usersToCreate = faker.helpers.multiple(
      () => {
        return {
          id: faker.string.uuid(),
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          role: UserRoleEnum.USER,
        };
      },
      {
        count: 5,
      },
    );

    const adminsToCreate = faker.helpers.multiple(
      () => {
        return {
          id: faker.string.uuid(),
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          role: UserRoleEnum.ADMIN,
        };
      },
      {
        count: 5,
      },
    );

    const encryptedPassword = await bcrypt.hash(userFixture.password, 10);
    usersToCreate.push({ ...userFixture, password: encryptedPassword });

    const userRepository = this.connection.getRepository(UserEntity);

    await Promise.all([
      userRepository.save(usersToCreate),
      userRepository.save(adminsToCreate),
    ]);
  }
}

new DatabaseSeed().perform();
