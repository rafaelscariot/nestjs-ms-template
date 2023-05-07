import { Injectable } from '@nestjs/common';
import { UserInterface } from '@user/interface/user.interface';
import { UserRepository } from '@user/repository/user.repository';

@Injectable()
export class FindAllUsersService {
  constructor(private readonly userRepositoy: UserRepository) {}

  async perform(): Promise<UserInterface[]> {
    return this.userRepositoy.findAll();
  }
}
