import { UserInterface } from '@src/user/interface/user.interface';
import { UserEntity } from '@database/entity/user.entity';
import { BaseTest } from '@test/base-test';
import { getDataSourceToken } from '@nestjs/typeorm';
import { ConnectionProviderEnum } from '@src/database/enum/connection-provider.enum';

export class UserFactory extends BaseTest {
  private readonly connection = BaseTest.get(
    getDataSourceToken(
      ConnectionProviderEnum.POSTGRES_WRITE_CONNECTION,
    ) as string,
  );

  async createOne(user: UserInterface): Promise<UserEntity> {
    const newUser = this.connection.getRepository(UserEntity).create(user);
    return this.connection.getRepository(UserEntity).save(newUser);
  }
}
