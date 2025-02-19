import { Insumo } from "src/insumo/entities/insumo.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class PrecioInsumo {

  @PrimaryGeneratedColumn()
  codPrecioInsumo: number;

  @Column()
  fechaDesde: string;

  @Column()
  valor: number;

  @Column()
  valorVenta: number;

  @ManyToOne(() => Insumo, (insumo) => insumo.preciosInsumo, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'codInsumo' })
  insumo: Insumo;
}
