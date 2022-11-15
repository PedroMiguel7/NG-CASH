import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668524370417 implements MigrationInterface {
    name = 'default1668524370417'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Accont" ("id" SERIAL NOT NULL, "balance" double precision NOT NULL, CONSTRAINT "PK_bf5d144a5a6148dc1a94dc6942d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Transactions" ("id" SERIAL NOT NULL, "debitedAccountId" integer NOT NULL, "creditedAccountId" integer NOT NULL, "value" double precision NOT NULL, "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_7761bf9766670b894ff2fdb3700" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" text NOT NULL, "password" text NOT NULL, "accountId" integer, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "Transactions"`);
        await queryRunner.query(`DROP TABLE "Accont"`);
    }

}
