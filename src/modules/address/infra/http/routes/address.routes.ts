import { Router } from 'express';

import { AddressController } from '../controller/AddressController';

const addressRouter = Router();
const addressController = new AddressController();

addressRouter.post('/create', addressController.createAddress);

export { addressRouter };
