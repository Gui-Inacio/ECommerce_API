import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import '../typeorm';
import '../../container';

import { ErrorRequestHandler } from '../../errors/error-handler';
import swaggerFile from '../../../../swagger/swagger_output.json';

import { router } from './routes/router';

const app = express();

app.use(express.json({ limit: '200mb' }));
app.use(cors());
app.use('/api', router);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(ErrorRequestHandler);

export { app };
