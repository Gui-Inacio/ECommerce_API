import 'dotenv-safe/config';
import { DataSource } from 'typeorm';

import { logger } from '../../container/providers/logger';

const jsEnvs = ['homolog', 'production'];
const prefixFolder = jsEnvs.includes(process.env.NODE_ENV as string)
  ? 'dist'
  : 'src';

const entitiesFolder = `${prefixFolder}/**/entities/**/*{.ts,.js}`;
const migrationsFolder = `${prefixFolder}/shared/infra/typeorm/migrations/**/*{.ts,.js}`;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  logging: false,
  entities: [entitiesFolder],
  migrations: [migrationsFolder],
});

AppDataSource.initialize()
  .then(() => logger.info('🚀 Database Connected!'))
  .catch((err) => {
    console.error('⛔ Erro ao conectar no Banco de Dados', err);
  });
