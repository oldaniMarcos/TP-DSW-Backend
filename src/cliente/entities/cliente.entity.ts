import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cliente {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dni: string;

  @Column()
  nombreYApellido: string;

  @Column()
  telefono: string;

  @Column()
  direccion: string;

  @Column()
  email: string;

  @Column()
  usuario: string;

  @Column()
  password: string

}
