import { UserInterface } from '@user/interface/user.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '@user/repository/user.repository';
import { UserErrorMessageEnum } from '@src/user/enum/user-error-message.enum';

@Injectable()
export class FindUserByEmailService {
  constructor(private readonly userRepositoy: UserRepository) {}

  async perform(email: string): Promise<UserInterface> {
    const user = await this.userRepositoy.findByEmail(email);

    if (!user) throw new NotFoundException(UserErrorMessageEnum.USER_NOT_FOUND);

    return user;
  }
}
