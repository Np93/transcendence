import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Socket } from 'socket.io';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" })
  avatar: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: false })
  twoFa: boolean;

  @Column({ nullable: true })
  twoFaSecret: string;

  @Column({ type: 'simple-json', default: [] })
  socket: string[];

  @Column({ default: 500 })
  score: number;

  @Column({ default: 0 })
  connected: number;
}