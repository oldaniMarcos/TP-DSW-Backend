import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class PrecioAtencion {

  @PrimaryGeneratedColumn()
  idPrecioAtencion: number;
  // idAtencion: number; //entidad debil

  @Column()
  fechaDesde: string;

  @Column()
  valor: number;

}
