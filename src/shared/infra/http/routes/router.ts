import { Router } from 'express';

/**
 * As importações de rotas não podem ter alias,
 * pois o swagger não consegue processar elas.
 */
import { AuthenticationRouter } from '../../../../modules/authentication/infra/http/routes/authentication.routes';
import { UsersRouter } from '../../../../modules/users/infra/http/routes/users.routes';

import { productRouter } from '@/modules/products/routes/product.routes';
import { categoryRouter } from '@/modules/products/routes/category.routes';

const router = Router();

router.get(
  '/',
  (_req, res) => {
    const data = {
      uptime: process.uptime(),
      message: 'Ok',
      date: new Date(),
      serviceName: process.env.SERVICE_NAME,
    };

    res.status(200).send(data);
  },
  /*  
    #swagger.tags = ['Healtcheck']
    #swagger.summary = 'Healtcheck'
  */
);

router.use('/users', UsersRouter);
router.use('/authentication', AuthenticationRouter);
router.use('/products', productRouter);
router.use('/category', categoryRouter);

export { router };
