import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

import { CreateTask } from './create-task.dto';

export class UpdateTask extends PartialType(CreateTask) {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) =>
    typeof value === 'string'
      ? ['true', '1', 'yes'].includes(value.toLocaleLowerCase())
      : value,
  )
  readonly completed?: boolean;
}
