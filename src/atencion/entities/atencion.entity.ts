import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Atencion {

  @PrimaryGeneratedColumn()
  idAtencion: number;

  @Column()
  fechaHora: string;

  @Column()
  resultado: string;

  @Column()
  observaciones: string;

}
