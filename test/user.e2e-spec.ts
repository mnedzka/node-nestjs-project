import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { UserRegisterRequestDto, UserRegisterResponseDto } from 'src/user/dto';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const userStatsUrl = '/user/stats?sort=DESC';
  it(userStatsUrl + ' (GET)', () => {
    const resBody = {
      id: expect.any(Number),
      name: 'piotr',
      query: {
        sort: expect.any(String),
      },
    };
    return request(app.getHttpServer())
      .get(userStatsUrl)
      .expect(200)
      .then(res => {
        expect(res.body).toMatchObject(resBody);
      });
  });

  it('/user/stats (POST)', () => {
    const req = {
      sort: 'DESC',
    };
    const resBody = {
      id: 1,
      name: 'piotr',
      body: {
        sort: expect.any(String),
      },
    };
    return request(app.getHttpServer())
      .post('/user/stats')
      .send(req)
      .expect(201)
      .then(res => {
        expect(res.body).toMatchObject(resBody);
      });
  });

  it('/user/register (POST)', () => {
    const req: UserRegisterRequestDto = {
      name: 'piotr',
      password: '123',
      email: 'piotr@myflow.pl',
    };
    const resBody: UserRegisterResponseDto = {
      user: {
        id: 1,
        name: 'piotr',
      },
    };
    return request(app.getHttpServer())
      .post('/user/register')
      .send(req)
      .expect(201)
      .then(res => {
        expect(res.body).toMatchObject(resBody);
      });
  });
});
