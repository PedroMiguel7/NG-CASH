import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668599228966 implements MigrationInterface {
    name = 'default1668599228966'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Transactions" ALTER COLUMN "createdAt" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Transactions" ALTER COLUMN "createdAt" DROP DEFAULT`);
    }

}
