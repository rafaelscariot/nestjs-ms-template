import { suite, test } from '@testdeck/jest';
import { FindAllUsersService } from './find-all-users.service';
import * as UserFixture from '@test/fixture/user.fixture.json';

@suite
export class FindAllUsersServiceUnitTest {
  private findAllUsersService: FindAllUsersService;
  private userRepositoryMock: any;

  async before() {
    this.userRepositoryMock = {
      findAll: jest.fn().mockResolvedValue([UserFixture]),
    };

    // @ts-ignore
    this.findAllUsersService = new FindAllUsersService(this.userRepositoryMock);
  }

  @test
  async 'should return one user'() {
    const result = await this.findAllUsersService.perform();

    expect(result).toHaveLength(1);
    expect(result).toStrictEqual([UserFixture]);
  }

  @test
  async 'should return an empty array of users'() {
    this.userRepositoryMock.findAll = jest.fn().mockResolvedValue([]);
    const result = await this.findAllUsersService.perform();

    expect(result).toStrictEqual([]);
  }
}
