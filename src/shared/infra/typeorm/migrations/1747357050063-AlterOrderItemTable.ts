import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterOrderItemTable1747357050063 implements MigrationInterface {
  name = 'AlterOrderItemTable1747357050063';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order_items" DROP COLUMN "status"`);
    await queryRunner.query(`ALTER TABLE "order_items" DROP COLUMN "total"`);
    await queryRunner.query(
      `ALTER TABLE "order_items" ADD "quantity" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_items" ADD "price" numeric(10,2) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order_items" DROP COLUMN "price"`);
    await queryRunner.query(`ALTER TABLE "order_items" DROP COLUMN "quantity"`);
    await queryRunner.query(
      `ALTER TABLE "order_items" ADD "total" numeric(10,2) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_items" ADD "status" character varying NOT NULL`,
    );
  }
}
