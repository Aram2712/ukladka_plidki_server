
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class OrdersEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    square: number;

    @Column()
    phoneNumber: string;

    @Column({ nullable: true })
    imagesPath: string;
}
