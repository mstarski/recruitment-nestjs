import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { DataSourceImpl } from '../../src/database/database.types';
import { TestingTool } from '../../src/tools/testing.tool';
import { ConfigService } from '@nestjs/config';

describe('App e2e testing', () => {
  let app: INestApplication;

  const validShelterId = '123';
  const invalidShelterId = '123';
  const validCatId = '123';
  const invalidCatId = '123';
  const validClientId = '123';
  const invalidClientId = '123';

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(DataSourceImpl)
      .useFactory({
        factory: (configService: ConfigService) =>
          TestingTool.getTestDbDataSource(configService),
        inject: [ConfigService],
      })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  // Register a cat in a shelter
  describe('[POST] /registration/:shelterId', () => {
    it('should return bad request if shelter does not exist', () => {
      return request(app.getHttpServer())
        .post(`/registration/${invalidShelterId}`)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return bad request on invalid cat data', () => {
      return request(app.getHttpServer())
        .post(`/reqistration/${validShelterId}`)
        .send({ foo: 'bar' })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return ok on valid request', () => {
      return request(app.getHttpServer())
        .post(`/registration/${validShelterId}`)
        .send({}) // Ok
        .expect(HttpStatus.OK);
    });
  });

  // List cats from given shelter
  describe('[GET] /shelter/:shelterId', () => {
    it('should return bad request if shelter does not exist', () => {
      return request(app.getHttpServer())
        .get(`/shelter/${invalidShelterId}`)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return ok with paginated list of cats if shelterId is valid', () => {
      return request(app.getHttpServer())
        .get(`/shelter/${invalidShelterId}`)
        .expect(HttpStatus.OK);
    });
  });

  // Adopt a cat
  describe('[POST] /adoption/:catId/:clientId', () => {
    it('should return bad request if cat does not exist', () => {
      return request(app.getHttpServer())
        .post(`/adoption/${invalidCatId}/${validClientId}`)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return bad request if client does not exist', () => {
      return request(app.getHttpServer())
        .post(`/adoption/${validCatId}/${invalidClientId}`)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return ok on valid request', () => {
      return request(app.getHttpServer())
        .post(`/adoption/${validCatId}/${validClientId}`)
        .expect(HttpStatus.OK);
    });
  });

  // Create vet appointment
  describe('[POST] /appointment/:catId', () => {
    it('should return bad request if cat does not exist', () => {
      return request(app.getHttpServer())
        .post(`/appointment/${invalidCatId}`)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return bad request if date is in the past', () => {
      return request(app.getHttpServer())
        .post(`/appointment/${invalidCatId}`)
        .send({}) // Past date
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return conflict if requested date is already taken', () => {
      return request(app.getHttpServer())
        .post(`/appointment/${invalidCatId}`)
        .send({}) // Existing date
        .expect(HttpStatus.CONFLICT);
    });

    it('should return ok on valid request', () => {
      return request(app.getHttpServer())
        .post(`/appointment/${invalidCatId}`)
        .send({}) // Ok
        .expect(HttpStatus.OK);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
