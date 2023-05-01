import { registerAs } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CreateTaskTableMigration } from 'src/migrations/1682914014424-create-task-table.migration';

export default registerAs(
  'db',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    autoLoadEntities: true,
    synchronize: false,
    migrationsRun: process.env.NODE_ENV !== 'production',
    migrations: [CreateTaskTableMigration],
  }),
);
