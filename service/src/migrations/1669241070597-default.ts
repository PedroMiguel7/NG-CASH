import { MigrationInterface, QueryRunner } from "typeorm";

export class default1669241070597 implements MigrationInterface {
    name = 'default1669241070597'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Accounts" ("id" SERIAL NOT NULL, "balance" double precision NOT NULL, CONSTRAINT "PK_215996d902f717c5a3a0b54194e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" text NOT NULL, "password" text NOT NULL, "accountIdId" integer, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "REL_bca6b6f3bf5b14fc88d2bae762" UNIQUE ("accountIdId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Transactions" ("id" SERIAL NOT NULL, "value" double precision NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "debitedAccountIdId" integer, "creditedAccountIdId" integer, CONSTRAINT "REL_4e827e9fce3c7c0a2ad017410e" UNIQUE ("debitedAccountIdId"), CONSTRAINT "REL_d98aaccf1177172256d59ab1ff" UNIQUE ("creditedAccountIdId"), CONSTRAINT "PK_7761bf9766670b894ff2fdb3700" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_bca6b6f3bf5b14fc88d2bae762d" FOREIGN KEY ("accountIdId") REFERENCES "Accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Transactions" ADD CONSTRAINT "FK_4e827e9fce3c7c0a2ad017410ef" FOREIGN KEY ("debitedAccountIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Transactions" ADD CONSTRAINT "FK_d98aaccf1177172256d59ab1ff5" FOREIGN KEY ("creditedAccountIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Transactions" DROP CONSTRAINT "FK_d98aaccf1177172256d59ab1ff5"`);
        await queryRunner.query(`ALTER TABLE "Transactions" DROP CONSTRAINT "FK_4e827e9fce3c7c0a2ad017410ef"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_bca6b6f3bf5b14fc88d2bae762d"`);
        await queryRunner.query(`DROP TABLE "Transactions"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "Accounts"`);
    }

}
