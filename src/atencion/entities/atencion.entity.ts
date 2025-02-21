import { Animal } from "src/animal/entities/animal.entity";
import { Insumo } from "src/insumo/entities/insumo.entity";
import { PrecioAtencion } from "src/precio-atencion/entities/precio-atencion.entity";
import { Veterinario } from "src/veterinario/entities/veterinario.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Atencion {

  @PrimaryGeneratedColumn()
  idAtencion: number;

  @Column()
  fechaHora: string;

  @Column()
  resultado: string;

  @Column()
  observaciones: string;

  @Column()
  valor: number;

  @ManyToOne(() => Animal, (animal) => animal.atenciones)
  animal: Animal;

  @ManyToOne(() => PrecioAtencion, (precioAtencion) => precioAtencion.atenciones)
  precioAtencion: PrecioAtencion;

  @ManyToOne(() => Veterinario, (veterinario) => veterinario.atenciones)
  veterinario: Veterinario;

  @ManyToMany(() => Insumo)
  @JoinTable()
  insumos: Insumo[]
}
