import { Exclude } from "class-transformer";
import { Task } from "src/tasks/task.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    userName: string;

    @Column()
    password: string;

    @OneToMany(type => Task, task => task.user, { eager: true })
    tasks: Task[]
} 