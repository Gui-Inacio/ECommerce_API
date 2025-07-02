import { Router } from 'express';

import { AddressController } from '../controller/AddressController';

import { isAuth } from '@/shared/infra/http/middlewares/IsAuth';

const addressRouter = Router();
const addressController = new AddressController();

addressRouter.post('/create', addressController.createAddress);
addressRouter.get(
  '/search/:user',
  isAuth,
  addressController.findAllAddressByUser,
);

export { addressRouter };
