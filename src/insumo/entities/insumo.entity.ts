import { PrecioInsumo } from "../../precio-insumo/entities/precio-insumo.entity";
import { TipoInsumo } from "../../tipo-insumo/entities/tipo-insumo.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity() 

export class Insumo {
  @PrimaryGeneratedColumn()
  codInsumo: number;

  @Column()
  descripcion: string;

  @Column()
  stock: number;

  @Column()
  fechaVencimiento: string;

  @ManyToOne(() => TipoInsumo, (tipoInsumo) => tipoInsumo.insumos)
  tipoInsumo: TipoInsumo;

  @OneToMany(() => PrecioInsumo, (preciosInsumo) => preciosInsumo.insumo, {cascade: true})
  preciosInsumo: PrecioInsumo[]
}

