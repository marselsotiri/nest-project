import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "src/tasks/task-status.enum";

export class GetTasksFilterDto {
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;
    @IsOptional()
    @IsNotEmpty()
    search?: string;
}