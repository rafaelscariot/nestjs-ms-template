import {
  ApiTags,
  ApiBody,
  ApiHeader,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthService } from '../service/auth.service';
import { signInSchema } from '@src/user/swagger/sign-in.schema';
import { AuthInterface } from '@src/user/interface/auth.interface';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  @ApiTags('auth')
  @ApiOperation({ summary: 'Authenticate user' })
  @ApiHeader({
    name: 'api-key',
    required: true,
  })
  @ApiBody(signInSchema)
  @ApiResponse({
    schema: {
      type: 'object',
      properties: { access_token: { title: 'access_token', type: 'string' } },
    },
  })
  async signIn(@Body() data: AuthInterface): Promise<{ access_token: string }> {
    return this.authService.signIn(data);
  }
}
