import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ForumEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  message: string;
}
