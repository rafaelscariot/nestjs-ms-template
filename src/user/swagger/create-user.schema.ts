import { UserRoleEnum } from '@user/enum/user-role.enum';

export const createUserSchema = {
  type: 'object',
  required: ['name', 'email'],
  properties: {
    name: {
      title: 'The user name',
      type: 'string',
      minLength: 5,
      example: 'John Conor',
    },
    email: {
      title: 'The user e-mail',
      type: 'email',
      minLength: 5,
      example: 'john@email.com',
    },
    password: {
      title: 'The user password',
      type: 'password',
      minLength: 5,
      example: 'coxinha123',
    },
    role: {
      title: 'The user role',
      type: 'string',
      enum: [UserRoleEnum.ADMIN, UserRoleEnum.USER],
      example: UserRoleEnum.USER,
    },
  },
};
