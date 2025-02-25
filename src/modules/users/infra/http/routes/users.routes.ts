import { Router } from 'express';

import { UsersController } from '../controller/UsersController';

const UsersRouter = Router();
const usersController = new UsersController();

UsersRouter.post(
  '/',
  usersController.createUser,
  /*  #swagger.tags = ['Users']
      #swagger.summary = 'Adiciona um novo usuário ao sistema'
      #swagger.parameters['body'] = {
        in: 'body',
        schema: {
          $name: "Joaquim Silva",
          $email: "email@gmail.com",
          $password: "password"
        }
      }
      #swagger.responses[201] = {}
  */
);

export { UsersRouter };
