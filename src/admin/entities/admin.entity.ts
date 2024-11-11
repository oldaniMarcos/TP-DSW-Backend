import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Admin {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  usuario: string
  
  @Column()
  password: string

}
