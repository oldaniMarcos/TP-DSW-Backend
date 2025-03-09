import { Atencion } from "../../atencion/entities/atencion.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class PrecioAtencion {

  @PrimaryGeneratedColumn()
idPrecioAtencion: number;

  @Column()
  fechaDesde: string;

  @Column()
  valor: number;

  @OneToMany(() => Atencion, (atenciones) => atenciones.precioAtencion)
  atenciones: Atencion[]
}
