import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Especie {

    @PrimaryGeneratedColumn()
    codEspecie: number;

    @Column()
    descripcion: string;


}
