import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTaskTableMigration implements MigrationInterface {
  public name = 'CreateTaskTable1682914014424';

  public async up(queryRunner: QueryRunner) {
    await queryRunner.query(/* sql */ `CREATE TABLE "task" (
      "id" character varying NOT NULL PRIMARY KEY,
      "title" character varying NOT NULL,
      "completed" boolean NOT NULL DEFAULT false,
      "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
      "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
    )`);
  }

  public async down(queryRunner: QueryRunner) {
    await queryRunner.query(/* sql */ `DROP TABLE "task"`);
  }
}
