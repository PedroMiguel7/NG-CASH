import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Account")
export class Accounts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "float" })
  balance: number;
}
