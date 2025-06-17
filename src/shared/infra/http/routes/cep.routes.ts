import { Router } from 'express';

import { UsersController } from '@/modules/users/infra/http/controller/UsersController';

const cepRouter = Router();
const userController = new UsersController();

cepRouter.get('/:cep', userController.getAddress);

export { cepRouter };
