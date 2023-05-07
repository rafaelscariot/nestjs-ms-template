import { suite, test } from '@testdeck/jest';
import { BadRequestException } from '@nestjs/common';
import { CreateOneUserService } from '@user/service/create-one-user/create-one-user.service';
import { UserErrorMessageEnum } from '@user/enum/user-error-message.enum';
import * as UserFixture from '@test/fixture/user.fixture.json';

@suite
export class CreateOneUserServiceUnitTest {
  private createOneUserService: CreateOneUserService;
  private userRepositoryMock: any;

  async before() {
    this.userRepositoryMock = {
      findByEmail: jest.fn().mockResolvedValue(UserFixture),
      createOne: jest.fn().mockResolvedValue(UserFixture),
    };

    // @ts-ignore
    this.createOneUserService = new CreateOneUserService(
      this.userRepositoryMock,
    );
  }

  @test
  async 'should create and return the new user'() {
    this.userRepositoryMock.findByEmail = jest.fn().mockResolvedValue(null);
    const result = await this.createOneUserService.perform(UserFixture);

    expect(result).toStrictEqual(UserFixture);
  }

  @test
  async 'should return a bad request exception with the message USER_ALREADY_EXISTS'() {
    const result = this.createOneUserService.perform(UserFixture);

    await expect(result).rejects.toThrow(
      new BadRequestException(UserErrorMessageEnum.USER_ALREADY_EXISTS),
    );
  }
}
