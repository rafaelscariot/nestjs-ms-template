import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@database/entity/user.entity';
import { UserInterface } from '@user/interface/user.interface';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity, 'POSTGRES_WRITE_CONNECTION')
    private readonly writeRepository: Repository<UserEntity>,
    @InjectRepository(UserEntity, 'POSTGRES_READ_CONNECTION')
    private readonly readRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return this.readRepository.find({ select: ['name', 'email', 'role'] });
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.readRepository.findOne({
      where: { email },
      select: ['name', 'email', 'password'],
    });
  }

  async createOne(data: UserInterface): Promise<void> {
    await this.writeRepository.save(data);
  }
}
