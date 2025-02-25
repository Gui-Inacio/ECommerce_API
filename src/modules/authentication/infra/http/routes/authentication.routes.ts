import { Router } from 'express';

import { isAuth } from '../../../../../shared/infra/http/middlewares/IsAuth';
import { AuthenticationController } from '../controller/AuthenticationController';

const AuthenticationRouter = Router();
const authenticationController = new AuthenticationController();

AuthenticationRouter.post(
  '/login',
  authenticationController.login,
  /*  #swagger.tags = ['Authentication']
      #swagger.summary = 'Realiza o login de um usuário'
      #swagger.parameters['body'] = {
        in: 'body',
        schema: {
          $email: "email@gmail.com",
          $password: "password"
        }
      }
      #swagger.responses[200] = {
        schema: {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cC",
          "user": {
            "userId": "2a41a504-1f97-4a96-814d-244033089610",
            "name": "Usuario",
            "email": "email@gmail.com",
          }
        }
      }
  */
);

AuthenticationRouter.post(
  '/password/forgot',
  authenticationController.forgotPassword,
  /*  #swagger.tags = ['Authentication']
        #swagger.summary = 'Envia o email de recuperação de senha'
        #swagger.parameters['body'] = {
          in: 'body',
          schema: {
           "email": "email@gmail.com"
          }
        }
        #swagger.responses[200] = {
          schema: {
            "mensagem": "E-mail enviado com sucesso!"
          }
        }
    */
);
AuthenticationRouter.post(
  '/password/reset',
  isAuth,
  authenticationController.resetPassword,
  /*  #swagger.tags = ['Authentication']
      #swagger.summary = 'Realiza o reset da senha do usuário'
      #swagger.security = [{ "bearerAuth": [] }]
      #swagger.parameters['body'] = {
        in: 'body',
        schema: {
          "password" : "123456",
          "newPassword" : "111111",
          "confirmPassword": "111111" 
        }
      }
      #swagger.responses[200] = {
        schema: {
          "mensagem": "Senha atualizada com sucesso!"
        }
      }
  */
);

export { AuthenticationRouter };
