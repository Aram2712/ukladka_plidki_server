
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class PriceListEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    price: string;
}