import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
