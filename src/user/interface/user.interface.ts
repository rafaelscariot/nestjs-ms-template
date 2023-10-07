import { UserRoleEnum } from '@user/enum/user-role.enum';

export interface UserInterface {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRoleEnum;
}
