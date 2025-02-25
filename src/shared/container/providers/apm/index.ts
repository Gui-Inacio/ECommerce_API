import ElasticApmNode from 'elastic-apm-node';

import { logger } from '../logger';

const allowedEnvironments = ['homolog', 'production'];

try {
  if (
    process.env.NODE_ENV &&
    allowedEnvironments.includes(process.env.NODE_ENV)
  ) {
    ElasticApmNode.start({
      serviceName: process.env.SERVICE_NAME,
      serverUrl: process.env.APM_SERVICE_URL,
      secretToken: process.env.APM_ELASTIC_TOKEN,
      environment: process.env.APM_SERVICE_ENVIRONMENT,
      logUncaughtExceptions: true,
      verifyServerCert: process.env.APM_SERVICE_VERIFY_SERVER === 'true',
      serverCaCertFile:
        process.env.APM_SERVICE_SERVER_CA_CERT_FILE === 'false'
          ? ''
          : process.env.APM_SERVICE_SERVER_CA_CERT_FILE,
      active: process.env.APM_ACTIVE === 'true',
    });
    logger.info('APM iniciado com sucesso');
  }
} catch (error) {
  logger.error(`Falha ao iniciar Elastic APM: ${error}`);
}
