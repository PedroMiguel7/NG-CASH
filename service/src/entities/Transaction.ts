import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Transactions')
export class Transactions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  debitedAccountId: number;

  @Column({ type: "int" })
  creditedAccountId: number;

  @Column({ type: "float" })
  value: number;

  @Column({ type: "timestamp" })
  createdAt: Date;
}
