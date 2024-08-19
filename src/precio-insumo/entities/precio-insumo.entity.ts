import { Insumo } from "src/insumo/entities/insumo.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class PrecioInsumo {

  @PrimaryGeneratedColumn()
  codPrecioInsumo: number;

  // codInsumo: number;

  @Column()
  fechaDesde: string;

  @Column()
  valor: number;

  @Column()
  valorVenta: number;

  @ManyToOne(() => Insumo, (insumo) => insumo.preciosInsumo)
  insumo: Insumo;
}
