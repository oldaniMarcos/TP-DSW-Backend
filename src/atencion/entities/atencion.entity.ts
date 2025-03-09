import { Animal } from "../../animal/entities/animal.entity";
import { Insumo } from "../../insumo/entities/insumo.entity";
import { PrecioAtencion } from "../../precio-atencion/entities/precio-atencion.entity";
import { Veterinario } from "../../veterinario/entities/veterinario.entity";
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
