import { Router } from 'express';

import { AddressController } from '../controller/AddressController';

import { isAuth } from '@/shared/infra/http/middlewares/IsAuth';

const addressRouter = Router();
const addressController = new AddressController();

addressRouter.post('/create', addressController.createAddress);
addressRouter.get(
  '/user/:user',
  isAuth,
  addressController.findAllAddressByUser,
);
addressRouter.get('/:id', isAuth, addressController.findById);
addressRouter.get(
  '/user/default/:user',
  isAuth,
  addressController.findDefaultByUser,
);

export { addressRouter };
