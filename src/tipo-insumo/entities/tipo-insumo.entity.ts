import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class TipoInsumo {

  @PrimaryGeneratedColumn()
  codTipoInsumo: number;

  @Column()
  descripcion: string;
}
