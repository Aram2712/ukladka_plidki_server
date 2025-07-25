import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class ServicesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column({ nullable: true })
  imagesPaths: string;
}
