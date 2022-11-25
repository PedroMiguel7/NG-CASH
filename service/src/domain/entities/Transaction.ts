import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./User";

@Entity('Transactions')
export class Transactions {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users)
  @JoinColumn()
  debitedAccount: Users;

  @ManyToOne(() => Users)
  @JoinColumn()
  creditedAccount: Users;

  @Column({ type: "float" })
  value: number;

  @CreateDateColumn()
  createdAt: Date;
}
