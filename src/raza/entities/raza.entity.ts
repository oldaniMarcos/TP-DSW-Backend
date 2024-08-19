import { Especie } from "src/especie/entities/especie.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Raza {

  @PrimaryGeneratedColumn()
  codRaza: number;

  @Column()
  descripcion: string;

  @ManyToOne(() => Especie, (especie) => especie.razas)
  especie: Especie
}
