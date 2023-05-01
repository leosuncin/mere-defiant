import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

import { CreateTask } from './dto/create-task.dto';
import { UpdateTask } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  create(createTask: CreateTask) {
    const task = this.taskRepository.create(createTask);

    return this.taskRepository.save(task);
  }

  findAll() {
    return this.taskRepository.find();
  }

  async findOne(id: Task['id']) {
    const task = await this.taskRepository.findOneBy({ id });

    if (!task) {
      throw new NotFoundException(`Not found any task with id: ${id}`);
    }

    return task;
  }

  async update(id: Task['id'], updateTask: UpdateTask) {
    const task = await this.findOne(id);

    this.taskRepository.merge(task, updateTask);

    return this.taskRepository.save(task);
  }

  async remove(id: Task['id']) {
    const task = await this.findOne(id);

    return this.taskRepository.remove(task);
  }
}
