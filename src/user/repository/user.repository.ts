import { UserEntity } from '@database/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { UserInterface } from '@user/interface/user.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity, 'POSTGRES_WRITE_CONNECTION')
    private readonly writeRepository: Repository<UserEntity>,
    @InjectRepository(UserEntity, 'POSTGRES_READ_CONNECTION')
    private readonly readRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return this.readRepository.find();
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.readRepository.findOneBy({ email });
  }

  async createOne(data: UserInterface): Promise<UserEntity> {
    return this.writeRepository.save(data);
  }
}
