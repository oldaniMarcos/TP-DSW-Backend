import { Atencion } from "src/atencion/entities/atencion.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class PrecioAtencion {

  @PrimaryGeneratedColumn()
  idPrecioAtencion: number;
  // idAtencion: number; //entidad debil

  @Column()
  fechaDesde: string;

  @Column()
  valor: number;

  @OneToMany(() => Atencion, (atenciones) => atenciones.precioAtencion)
  atenciones: Atencion[]
}
