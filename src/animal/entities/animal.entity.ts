import { Atencion } from "../../atencion/entities/atencion.entity";
import { Cliente } from "../../cliente/entities/cliente.entity";
import { Raza } from "../../raza/entities/raza.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Animal {

    @PrimaryGeneratedColumn()
    nroHistClinica: number;

    @Column()
    nombre: string;

    @Column()
    fechaNac: string;

    @ManyToOne(() => Cliente, (cliente) => cliente.animales)
    cliente: Cliente;

    @ManyToOne(() => Raza, (raza) => raza.animales ) 
    raza: Raza;

    @OneToMany(() => Atencion, (atenciones) => atenciones.animal)
    atenciones: Atencion[]
}
