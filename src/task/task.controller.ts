import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';

import { CreateTask } from './dto/create-task.dto';
import { UpdateTask } from './dto/update-task.dto';

const validationPipe = new ValidationPipe({ transform: true, whitelist: true });

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UsePipes(validationPipe)
  create(@Body() createTask: CreateTask) {
    return this.taskService.create(createTask);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(validationPipe)
  update(@Param('id') id: string, @Body() updateTask: UpdateTask) {
    return this.taskService.update(id, updateTask);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
