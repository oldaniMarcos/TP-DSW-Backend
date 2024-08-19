import { Raza } from "src/raza/entities/raza.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Especie {

    @PrimaryGeneratedColumn()
    codEspecie: number;

    @Column()
    descripcion: string;

    @OneToMany(() => Raza, (razas) => razas.especie)
    razas: Raza[]
}
