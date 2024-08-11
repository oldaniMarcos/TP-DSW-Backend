import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Veterinario {

    @PrimaryGeneratedColumn()
    idVeterinario: number;

    @Column()
    nroMatricula: string;

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
}
