import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return 404 for unknown route', async () => {
    const res = await request(app.getHttpServer()).get('/').expect(404);
    expect(res.body.message).toEqual('Cannot GET /');
    expect(res.body.error).toEqual('Not Found');
  });

  afterAll(async () => {
    await app.close();
  });
});
