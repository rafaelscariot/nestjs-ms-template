import { suite, test } from '@testdeck/jest';
import { BadRequestException } from '@nestjs/common';
import { userFixture } from '@test/fixture/user.fixture';
import { FindUserByEmailService } from './find-user-by-email.service';
import { UserErrorMessageEnum } from '@src/user/enum/user-error-message.enum';

@suite
export class FindUserByEmailServiceUnitTest {
  private findUserByEmailService: FindUserByEmailService;
  private userRepositoryMock: any;

  async before() {
    this.userRepositoryMock = {
      findByEmail: jest.fn().mockResolvedValue(userFixture),
    };

    // @ts-ignore
    this.findUserByEmailService = new FindUserByEmailService(
      this.userRepositoryMock,
    );
  }

  @test
  async 'given the email, should return the user'() {
    const result = await this.findUserByEmailService.perform('adam@email.com');
    expect(result).toStrictEqual(userFixture);
  }

  @test
  async 'given an email from a non-existent user, should return a BadRequestException'() {
    this.userRepositoryMock.findByEmail = jest.fn().mockResolvedValue(null);

    const result = this.findUserByEmailService.perform('adam@email.com');

    await expect(result).rejects.toThrow(
      new BadRequestException(UserErrorMessageEnum.USER_NOT_FOUND),
    );
  }
}
