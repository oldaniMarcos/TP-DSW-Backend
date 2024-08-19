import { PrecioInsumo } from "src/precio-insumo/entities/precio-insumo.entity";
import { TipoInsumo } from "src/tipo-insumo/entities/tipo-insumo.entity";
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
  fechaVencimiento: string; // Las fechas van del 0 al 11 (0 = Enero)

  @ManyToOne(() => TipoInsumo, (tipoInsumo) => tipoInsumo.insumos)
  tipoInsumo: TipoInsumo;

  @OneToMany(() => PrecioInsumo, (preciosInsumo) => preciosInsumo.insumo)
  preciosInsumo: PrecioInsumo[]
}

