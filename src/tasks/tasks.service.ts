import { Injectable, NotFoundException } from '@nestjs/common';

import { createTaskDto } from 'src/tasks/dto/create-Task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from 'src/tasks/dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>,
    ) { }


    async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
        const { status, search } = filterDto

        const query = this.tasksRepository.createQueryBuilder('task')
        query.where({ user })

        if (status) {
            query.andWhere('task.status = :status', { status })

        }

        if (search) {
            query.andWhere('(LOWER(task.title) Like LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
                { search: `%${search}%` },
            )
        }

        const tasks = await query.getMany()
        return tasks;
    }

    // getAllTasks(): Task[] {
    //     return this.tasks
    // }

    // getTasksFilter(filterTasksDto: GetTasksFilterDto): Task[] {
    //     const { status, search } = filterTasksDto
    //     let tasks = this.getAllTasks()
    //     if (status) {
    //         tasks = tasks.filter(task => task.status === status)
    //     }
    //     if (search) {
    //         tasks = tasks.filter(task => {
    //             if (task.title.includes(search) || task.description.includes(search)) {
    //                 return true
    //             }
    //             return false
    //         })
    //     }
    //     return tasks
    // }

    async createTask(createTaskDto: createTaskDto, user: User): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = this.tasksRepository.create({
            title,
            description,
            status: TaskStatus.OPEN,
            user,
        })
        await this.tasksRepository.save(task)
        return task
    }

    // createTask(createTaskDto: createTaskDto): Task {
    //     const { title, description } = createTaskDto
    //     const task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //     }
    //     this.tasks.push(task)
    //     return task
    // }

    async getTaskById(id: string, user: User): Promise<Task> {
        const found = await this.tasksRepository.findOne({ where: { id: id, user } })
        if (!found) {
            throw new NotFoundException
        }
        return found
    }

    // getTaskById(id: string): Task {

    //     const found = this.tasks.find(task => task.id === id)

    //     if (!found) {
    //         throw new NotFoundException(`Task with id: "${id}" does not exist! `)
    //     }

    //     return found


    // }

    async updateTask(id: string, status: TaskStatus, user: User): Promise<Task> {
        const task = await this.getTaskById(id, user)
        task.status = status
        this.tasksRepository.save(task)
        return task
    }

    // updateTask(id: string, status: TaskStatus): Task {
    //     const task = this.getTaskById(id)
    //     task.status = status
    //     return task
    // }

    async deleteTaskById(id: string, user: User): Promise<void> {
        const result = await this.tasksRepository.delete({ id, user })

        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID "${id}" not found`)
        }
    }

    // deleteTaskById(id: string): void {
    //     const found = this.getTaskById(id)
    //     this.tasks = this.tasks.filter(task => task.id !== found.id)
    // }
}
