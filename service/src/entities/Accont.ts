import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Accont")
export class Acconts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "float" })
  balance: number;
}
