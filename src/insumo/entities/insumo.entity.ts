import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}

