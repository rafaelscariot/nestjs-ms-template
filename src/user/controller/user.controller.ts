import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserInterface } from '@user/interface/user.interface';
import { CreateUserService } from '@src/user/service/create-user/create-user.service';
import { FindAllUsersService } from '@user/service/find-all-users/find-all-users.service';
import { ApiBody, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { createUserSchema } from '@src/user/swagger/create-user.schema';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly findAllUsersService: FindAllUsersService,
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
}
