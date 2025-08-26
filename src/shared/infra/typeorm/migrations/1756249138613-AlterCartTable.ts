import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterCartTable1756249138613 implements MigrationInterface {
  name = 'AlterCartTable1756249138613';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "carts" ADD "status" character varying NOT NULL DEFAULT 'active'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "carts" DROP COLUMN "status"`);
  }
}
