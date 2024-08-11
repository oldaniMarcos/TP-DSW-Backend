import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Raza {

  @PrimaryGeneratedColumn()
  codRaza: number;

  @Column()
  descripcion: string;
}
