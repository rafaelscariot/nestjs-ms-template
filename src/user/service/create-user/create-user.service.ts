import * as bcrypt from 'bcrypt';
import { UserInterface } from '@user/interface/user.interface';
import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from '@user/repository/user.repository';
import { UserErrorMessageEnum } from '@user/enum/user-error-message.enum';

@Injectable()
export class CreateUserService {
  constructor(private readonly userRepositoy: UserRepository) {}

  async perform(data: UserInterface): Promise<void> {
    const userAlreadyExists = await this.userRepositoy.findByEmail(data.email);

    if (userAlreadyExists)
      throw new BadRequestException(UserErrorMessageEnum.USER_ALREADY_EXISTS);

    const encryptedPassword = await bcrypt.hash(data.password, 10);

    await this.userRepositoy.createOne({
      ...data,
      password: encryptedPassword,
    });
  }
}
