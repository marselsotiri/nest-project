import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { createTaskDto } from 'src/tasks/dto/create-Task.dto';
import { GetTasksFilterDto } from 'src/tasks/dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from 'src/tasks/dto/update-task-status.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private taskService: TasksService) { }

    @Get()
    getTasks(@Query() filterTasksDto: GetTasksFilterDto, @GetUser() user: User): Promise<Task[]> {
        return this.taskService.getTasks(filterTasksDto, user)
    }
    // @Get()
    // getTasks(@Query() filterTasksDto: GetTasksFilterDto): Task[] {
    //     if (Object.keys(filterTasksDto).length) {
    //         return this.taskService.getTasksFilter(filterTasksDto)
    //     } else {
    //         return this.taskService.getAllTasks()
    //     }
    // }

    @Get('/:id')
    getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
        return this.taskService.getTaskById(id, user)
    }

    // @Get('/:id')
    // getTaskById(@Param('id') id: string): Task {
    //     return this.taskService.getTaskById(id)
    // }

    @Post()
    createTask(@Body() createTaskDto: createTaskDto,
        @GetUser() user: User): Promise<Task> {
        return this.taskService.createTask(createTaskDto, user)
    }

    @Patch('/:id/status')
    updateTask(@Param('id') id: string,
        @Body() updateTaskStatusDto: UpdateTaskStatusDto,
        @GetUser() user: User): Promise<Task> {
        const { status } = updateTaskStatusDto
        return this.taskService.updateTask(id, status, user)
    }


    @Delete('/:id')
    deleteTaskById(@Param('id') id: string, @GetUser() user: User): Promise<void> {
        return this.taskService.deleteTaskById(id, user)
    }



    // @Delete('/:id')
    // deleteTaskById(@Param('id') id: string): void {
    //     return this.taskService.deleteTaskById(id)
    // }
}
