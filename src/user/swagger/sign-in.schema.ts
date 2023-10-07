export const signInSchema = {
  description: 'The user to authenticate',
  schema: {
    type: 'object',
    properties: {
      email: {
        title: 'The user e-mail',
        type: 'email',
        minLength: 5,
        example: 'adam@email.com',
      },
      password: {
        title: 'The user password',
        type: 'string',
        minLength: 5,
        example: 'coxinha123',
      },
    },
  },
};
