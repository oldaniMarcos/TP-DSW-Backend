import { Insumo } from "../../insumo/entities/insumo.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class TipoInsumo {

  @PrimaryGeneratedColumn()
  codTipoInsumo: number;

  @Column()
  descripcion: string;

  @OneToMany(() => Insumo, (insumos) => insumos.tipoInsumo)
  insumos: Insumo[]
}
