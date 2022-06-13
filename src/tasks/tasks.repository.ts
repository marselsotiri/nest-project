// import { createTaskDto } from "src/dto/create-Task.dto";
// import { EntityRepository, Repository } from "typeorm";
// import { TaskStatus } from "./task-status.enum";
// import { Task } from "./task.entity";

// @EntityRepository(Task)
// export class TasksRepository extends Repository<Task> {
//     async createTask(createTaskDto: createTaskDto): Promise<Task> {
//         const { title, description } = createTaskDto
//         const task = this.create({
//             title,
//             description,
//             status: TaskStatus.OPEN,
//         })
//         await this.save(task)
//         return task
//     }
// } 