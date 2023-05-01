import { createId } from '@paralleldrive/cuid2';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryColumn()
  readonly id: string = createId();

  @Column()
  title!: string;

  @Column('boolean')
  completed = false;

  @CreateDateColumn()
  readonly createdAt = new Date();

  @UpdateDateColumn()
  readonly updatedAt = new Date();
}
