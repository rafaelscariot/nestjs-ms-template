import { suite, test } from '@testdeck/jest';
import { BadRequestException } from '@nestjs/common';
import { CreateUserService } from '@src/user/service/create-user/create-user.service';
import { UserErrorMessageEnum } from '@user/enum/user-error-message.enum';
import { userFixture } from '@test/fixture/user.fixture';

@suite
export class CreateUserServiceUnitTest {
  private createUserService: CreateUserService;
  private userRepositoryMock: any;

  async before() {
    this.userRepositoryMock = {
      findByEmail: jest.fn().mockResolvedValue(userFixture),
      createOne: jest.fn().mockResolvedValue(userFixture),
    };

    // @ts-ignore
    this.createUserService = new CreateUserService(this.userRepositoryMock);
  }

  @test
  async 'should create an user calling the createOne method from userRepository'() {
    this.userRepositoryMock.findByEmail = jest.fn().mockResolvedValue(null);
    await this.createUserService.perform(userFixture);
    expect(this.userRepositoryMock.createOne).toHaveBeenCalledWith(userFixture);
  }

  @test
  async 'should return a bad request exception with the message USER_ALREADY_EXISTS'() {
    const result = this.createUserService.perform(userFixture);

    await expect(result).rejects.toThrow(
      new BadRequestException(UserErrorMessageEnum.USER_ALREADY_EXISTS),
    );
  }
}
