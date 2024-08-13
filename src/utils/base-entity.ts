import { Column, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "./enums";

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  createdAt!: number;

  @Column()
  updatedAt!: number;

  @Column({enum: Status, default: Status.ACTIVE})
  status!: Status;

}