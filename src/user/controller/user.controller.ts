import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserInterface } from '@user/interface/user.interface';
import { CreateOneUserService } from '@user/service/create-one-user/create-one-user.service';
import { FindAllUsersService } from '@user/service/find-all-users/find-all-users.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly createOneUserService: CreateOneUserService,
    private readonly findAllUsersService: FindAllUsersService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiBody({
    description: 'The user to create',
    schema: {
      type: 'object',
      required: ['name', 'email'],
      properties: {
        name: {
          title: 'The user name',
          example: 'John Conor',
          minLength: 4,
          type: 'string',
        },
        email: {
          title: 'The user e-mail',
          example: 'john@email.com',
          minLength: 4,
          type: 'email',
        },
      },
    },
  })
  async createOne(@Body() data: UserInterface): Promise<UserInterface> {
    return this.createOneUserService.perform(data);
  }

  @Get()
  @ApiOperation({ summary: 'Find all users' })
  async findAll(): Promise<UserInterface[]> {
    return this.findAllUsersService.perform();
  }
}
