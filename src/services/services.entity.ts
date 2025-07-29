import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class ServicesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  header: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column({ type: 'text', nullable: true })
  imagesPaths: string;
}
