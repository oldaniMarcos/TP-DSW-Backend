import { Atencion } from "src/atencion/entities/atencion.entity";
import { Cliente } from "src/cliente/entities/cliente.entity";
import { Raza } from "src/raza/entities/raza.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToOne(() => Cliente, (cliente) => cliente.animales)
    cliente: Cliente;

    @ManyToOne(() => Raza, (raza) => raza.animales ) 
    //@JoinColumn()
    raza: Raza;

    @OneToMany(() => Atencion, (atenciones) => atenciones.animal)
    atenciones: Atencion[]
}
