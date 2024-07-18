import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Animal {

    @PrimaryGeneratedColumn()
    nroHistClinica: number;

    @Column()
    nombre: string;

    @Column()
    fechaNac: string;

    @Column()
    edad: number;

}
