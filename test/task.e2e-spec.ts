import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { Repository } from 'typeorm';

import { AppModule } from '../src/app.module';
import { Task } from '../src/task/entities/task.entity';

describe('TaskController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<Task>;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    repository = moduleFixture.get(getRepositoryToken(Task));
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /task', async () => {
    const data = { title: 'Test task' };

    await request(app.getHttpServer())
      .post('/task')
      .send(data)
      .expect(HttpStatus.CREATED)
      .expect(({ body }) => {
        expect(body).toHaveProperty('id');
        expect(body).toHaveProperty('title', data.title);
        expect(body).toHaveProperty('completed', false);
        expect(body).toHaveProperty('createdAt');
        expect(body).toHaveProperty('updatedAt');
      });
  });

  it('GET /task', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/task')
      .expect(HttpStatus.OK);

    expect(Array.isArray(body)).toBe(true);
    await expect(repository.count()).resolves.toBe(body.length);
  });

  it('GET /task/:id', async () => {
    const task = await repository.findOne({ where: {} });

    await request(app.getHttpServer())
      .get(`/task/${task.id}`)
      .expect(HttpStatus.OK)
      .expect(({ body }) => {
        expect(body).toHaveProperty('id', task.id);
        expect(body).toHaveProperty('title', task.title);
        expect(body).toHaveProperty('completed', task.completed);
        expect(body).toHaveProperty('createdAt', task.createdAt.toISOString());
        expect(body).toHaveProperty('updatedAt', task.updatedAt.toISOString());
      });
  });

  it('PATCH /task/:id', async () => {
    const task = await repository.findOne({ where: {} });
    const data = { completed: true };

    await request(app.getHttpServer())
      .patch(`/task/${task.id}`)
      .send(data)
      .expect(HttpStatus.OK)
      .expect(({ body }) => {
        expect(body).toHaveProperty('id', task.id);
        expect(body).toHaveProperty('title', task.title);
        expect(body).toHaveProperty('completed', data.completed);
        expect(body).toHaveProperty('createdAt', task.createdAt.toISOString());
        expect(body).toHaveProperty('updatedAt');
      });

    await expect(
      repository.findOneOrFail({ where: { id: task.id } }),
    ).resolves.toHaveProperty('completed', data.completed);
  });

  it('DELETE /task/:id', async () => {
    const task = await repository.findOne({ where: {} });

    await request(app.getHttpServer())
      .delete(`/task/${task.id}`)
      .expect(HttpStatus.OK);

    await expect(
      repository.findOneOrFail({ where: { id: task.id } }),
    ).rejects.toThrowError();
  });
});
