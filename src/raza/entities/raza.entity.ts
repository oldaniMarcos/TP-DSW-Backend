import { Animal } from "src/animal/entities/animal.entity";
import { Especie } from "src/especie/entities/especie.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Raza {

  @PrimaryGeneratedColumn()
  codRaza: number;

  @Column()
  descripcion: string;

  @ManyToOne(() => Especie, (especie) => especie.razas)
  especie: Especie

  @OneToMany(() => Animal, (animales) => animales.raza)
  animales: Animal[]
}
