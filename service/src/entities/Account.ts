import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Accounts")
export class Accounts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "float" })
  balance: number;
}
