import { Animal } from "src/animal/entities/animal.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
  rol: 'cliente' | 'admin';

  @Column()
  usuario: string;

  @Column()
  password: string;

  @OneToMany(() => Animal, (animales) => animales.cliente)
  animales: Animal[]
}
