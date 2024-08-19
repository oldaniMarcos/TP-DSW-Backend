import { Atencion } from "src/atencion/entities/atencion.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(() => Atencion, (atenciones) => atenciones.veterinario)
    atenciones: Atencion[]
}
