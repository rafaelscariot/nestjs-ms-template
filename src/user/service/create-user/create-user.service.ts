import { Injectable, BadRequestException } from '@nestjs/common';
import { UserErrorMessageEnum } from '@user/enum/user-error-message.enum';
import { UserInterface } from '@user/interface/user.interface';
import { UserRepository } from '@user/repository/user.repository';

@Injectable()
export class CreateUserService {
  constructor(private readonly userRepositoy: UserRepository) {}

  async perform(data: UserInterface): Promise<void> {
    const userAlreadyExists = await this.userRepositoy.findByEmail(data.email);

    if (userAlreadyExists)
      throw new BadRequestException(UserErrorMessageEnum.USER_ALREADY_EXISTS);

    await this.userRepositoy.createOne(data);
  }
}
