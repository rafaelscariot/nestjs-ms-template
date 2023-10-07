import { TestBaseE2E } from '@test/test-base.e2e';
import { getDataSourceToken } from '@nestjs/typeorm';
import { UserEntity } from '@database/entity/user.entity';
import { UserInterface } from '@src/user/interface/user.interface';
import { ConnectionProviderEnum } from '@src/database/enum/connection-provider.enum';

export class UserFactory extends TestBaseE2E {
  private readonly connection = TestBaseE2E.get(
    getDataSourceToken(
      ConnectionProviderEnum.POSTGRES_WRITE_CONNECTION,
    ) as string,
  );

  private readonly userRepository = this.connection.getRepository(UserEntity);

  async createOne(user?: UserInterface): Promise<UserEntity> {
    return this.userRepository.save(user);
  }

  async createMany(users?: UserInterface[]): Promise<UserEntity[]> {
    return this.userRepository.save(users);
  }
}
