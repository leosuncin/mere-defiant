import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import common from './config/common';
import db from './config/db';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [common],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(db)],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return config.getOrThrow<TypeOrmModuleOptions>('db');
      },
    }),
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
