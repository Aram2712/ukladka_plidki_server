
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CommentsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column()
    description: string;

    @Column()
    rating: number;
}
