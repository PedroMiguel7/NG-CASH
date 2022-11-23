import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./User";

@Entity('Transactions')
export class Transactions {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Users)
  @JoinColumn()
  debitedAccountId: Users;

  @OneToOne(() => Users)
  @JoinColumn()
  creditedAccountId: Users;

  @Column({ type: "float" })
  value: number;

  @CreateDateColumn()
  createdAt: Date;
}
