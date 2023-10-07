import {
  ApiBody,
  ApiTags,
  ApiParam,
  ApiHeader,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  UseGuards,
  HttpStatus,
  Controller,
} from '@nestjs/common';
import { AuthGuard } from '@src/auth/guard/auth.guard';
import { UserInterface } from '@user/interface/user.interface';
import { createUserSchema } from '@src/user/swagger/create-user.schema';
import { CreateUserService } from '@src/user/service/create-user/create-user.service';
import { FindAllUsersService } from '@user/service/find-all-users/find-all-users.service';
import { FindUserByEmailService } from '../service/find-user-by-email/find-user-by-email.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly findAllUsersService: FindAllUsersService,
    private readonly findUserByEmailService: FindUserByEmailService,
  ) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiTags('user')
  @ApiBearerAuth('jwt-auth')
  @ApiOperation({ summary: 'Create user' })
  @ApiHeader({ name: 'api-key', required: true })
  @ApiBody({
    description: 'The user to create',
    schema: createUserSchema,
  })
  async create(@Body() data: UserInterface): Promise<void> {
    await this.createUserService.perform(data);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  @ApiTags('user')
  @ApiBearerAuth('jwt-auth')
  @ApiOperation({ summary: 'Find all users' })
  @ApiHeader({ name: 'api-key', required: true })
  async findAll(): Promise<UserInterface[]> {
    return this.findAllUsersService.perform();
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/:email')
  @ApiTags('user')
  @ApiBearerAuth('jwt-auth')
  @ApiOperation({ summary: 'Find user by email' })
  @ApiHeader({ name: 'api-key', required: true })
  @ApiParam({ name: 'email', required: true })
  async findUserByEmail(@Param('email') email: string): Promise<UserInterface> {
    return this.findUserByEmailService.perform(email);
  }
}
