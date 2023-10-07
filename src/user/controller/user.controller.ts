import { UserInterface } from '@user/interface/user.interface';
import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { createUserSchema } from '@src/user/swagger/create-user.schema';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserService } from '@src/user/service/create-user/create-user.service';
import { FindAllUsersService } from '@user/service/find-all-users/find-all-users.service';
import { FindUserByEmailService } from '../service/find-user-by-email/find-user-by-email.service';
import { Request } from 'express';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly findAllUsersService: FindAllUsersService,
    private readonly findUserByEmailService: FindUserByEmailService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiHeader({ name: 'api-key', required: true })
  @ApiBody({
    description: 'The user to create',
    schema: createUserSchema,
  })
  async create(@Body() data: UserInterface): Promise<void> {
    await this.createUserService.perform(data);
  }

  @Get()
  @ApiOperation({ summary: 'Find all users' })
  @ApiHeader({ name: 'api-key', required: true })
  async findAll(): Promise<UserInterface[]> {
    return this.findAllUsersService.perform();
  }

  @Get('/:email')
  @ApiOperation({ summary: 'Find user by email' })
  @ApiHeader({ name: 'api-key', required: true })
  @ApiParam({ name: 'email', required: true })
  async findUserByEmail(@Param('email') email: string): Promise<UserInterface> {
    return this.findUserByEmailService.perform(email);
  }
}
