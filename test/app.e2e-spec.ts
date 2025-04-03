import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { PrismaService } from './../src/prisma/prisma.service';
import { ValidationPipe } from '@nestjs/common/pipes';

describe('UserController (e2e)', () => {
  let app: INestApplication<App>;
  let book_id: string;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    app.useGlobalPipes(new ValidationPipe());
    prisma = moduleFixture.get(PrismaService);
  });

  it('/user POST', async () => {
    let created = await request(app.getHttpServer()).post('/user').send({
      name: 'Alex',
      age: 24,
    });

    expect(created.body.data).toHaveProperty('id');
    expect(created.body.data).toHaveProperty('name', 'Alex');
    expect(created.body.data).toHaveProperty('age', 24);
    book_id = created.body.data.id;
  });

  it('/user/single GET', async () => {
    let one = await request(app.getHttpServer()).get(`/user/${book_id}`);

    expect(one.body.data).toHaveProperty('id');
    expect(one.body.data).toHaveProperty('name', 'Alex');
    expect(one.body.data).toHaveProperty('age', 24);
  });

  it('/user/single PATCH', async () => {
    let one = await request(app.getHttpServer())
      .patch(`/user/${book_id}`)
      .send({ name: 'Akmal' });

    expect(one.body.data).toHaveProperty('id');
    expect(one.body.data).toHaveProperty('name', 'Akmal');
    expect(one.body.data).toHaveProperty('age', 24);
  });

  it('/user/single DELETE', async () => {
    let one = await request(app.getHttpServer()).delete(`/user/${book_id}`);

    expect(one.body.data).toHaveProperty('id');
    expect(one.status).toBe(200);
  });

  it('/user/single not found', async () => {
    let one = await request(app.getHttpServer()).get(`/user/${book_id}`);
    console.log(one)
    expect(one.body.status).toBe(404);
  });

  // it('/ (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/')
  //     .expect(200)
  //     .expect('Hello World!');
  // });
});
