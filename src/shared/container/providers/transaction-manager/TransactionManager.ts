import { scoped, Lifecycle } from 'tsyringe';
import type { ObjectLiteral, QueryRunner } from 'typeorm';

import { randomUUID } from 'node:crypto';

import { logger } from '../logger';

import { Constructor } from '@/shared/util/types/ConstructorType';
import { AppDataSource } from '@/shared/infra/typeorm';
import AppError from '@/shared/errors/appError';

/**
 * @class TransactionManager
 * @description Serviço para gerenciamento de transação. Ao injetar esse serviço
 * a mesma instância será resolvida para cada resolução desta dependência durante uma
 * única cadeia de resolução.
 */
@scoped(Lifecycle.ResolutionScoped)
export class TransactionManager {
  public queryRunner: QueryRunner;
  private transactionId: string;

  public async startNewTransaction() {
    if (this.isTransactionActive()) {
      return;
    }

    this.transactionId = randomUUID();
    logger.info(`Transação [${this.transactionId}]: Iniciando transação`);
    await this.setupQueryRunner();
    await this.queryRunner.startTransaction();
  }

  private async setupQueryRunner() {
    if (!this.queryRunner) {
      this.queryRunner = AppDataSource.createQueryRunner();
      await this.queryRunner.connect();
    }
  }

  private async commit() {
    if (!this.isTransactionActive()) {
      throw new AppError('Transaction nod found');
    }
    await this.queryRunner.commitTransaction();
  }

  public async rollback() {
    if (!this.isTransactionActive()) {
      throw new AppError('Transaction nod found');
    }
    await this.queryRunner.rollbackTransaction();
  }

  public getRepository<T extends ObjectLiteral>(entity: Constructor<T>) {
    if (this.isTransactionActive()) {
      logger.info(
        `Transação [${this.transactionId}]: Obtendo repositório ${entity.name}`,
      );
      return this.queryRunner.manager.getRepository(entity);
    }

    return AppDataSource.getRepository(entity);
  }

  private isTransactionActive() {
    if (!this.queryRunner) {
      return false;
    }

    return this.queryRunner.isTransactionActive;
  }

  /**
   * Executa uma função dentro de uma transação
   *
   * @param callback Função a ser executada. Irá receber a transação como parâmetro
   */
  public async runInsideATransaction(callback: CallableFunction) {
    try {
      await this.startNewTransaction();

      const response = await callback();

      await this.commit();
      logger.info(`Transação [${this.transactionId}]: Commited`);

      return response;
    } catch (error) {
      await this.rollback();
      logger.info(`Transação [${this.transactionId}]: Rollback`);
      throw error;
    } finally {
      await this.queryRunner.release();
      logger.info(`Transação [${this.transactionId}]: Released`);
    }
  }
}
