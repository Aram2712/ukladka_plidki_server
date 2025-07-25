import { Column, PrimaryGeneratedColumn, OneToMany, Entity } from 'typeorm';

@Entity()
export class AuthEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  phoneNumber: string;

  @Column()
  password: string;

  @Column()
  role: string;
}
