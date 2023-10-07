import { IsEmail } from 'class-validator';

export class FindUserByEmailDto {
  @IsEmail()
  email: string;
}
