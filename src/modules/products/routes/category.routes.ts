import { Router } from 'express';

import { CategoryController } from '../infra/http/controller/CategoryController';

import { isAuth } from '@/shared/infra/http/middlewares/IsAuth';

const categoryRouter = Router();
const categoryController = new CategoryController();

categoryRouter.post('/create', isAuth, categoryController.createCategory);
categoryRouter.get('/search/:id', isAuth, categoryController.findById);
categoryRouter.get('/', isAuth, categoryController.listAll);
categoryRouter.put('/update/:id', isAuth, categoryController.update);
categoryRouter.delete('/delete/:id', isAuth, categoryController.delete);

export { categoryRouter };
