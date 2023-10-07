import { suite, test } from '@testdeck/jest';
import { userFixture } from '@test/fixture/user.fixture';
import { FindAllUsersService } from './find-all-users.service';

@suite
export class FindAllUsersServiceUnitTest {
  private findAllUsersService: FindAllUsersService;
  private userRepositoryMock: any;

  async before() {
    this.userRepositoryMock = {
      findAll: jest.fn().mockResolvedValue([userFixture]),
    };

    this.findAllUsersService = new FindAllUsersService(this.userRepositoryMock);
  }

  @test
  async 'should return one user'() {
    const result = await this.findAllUsersService.perform();

    expect(result).toHaveLength(1);
    expect(result).toStrictEqual([userFixture]);
  }

  @test
  async 'should return an empty array of users'() {
    this.userRepositoryMock.findAll = jest.fn().mockResolvedValue([]);
    const result = await this.findAllUsersService.perform();

    expect(result).toStrictEqual([]);
  }
}
