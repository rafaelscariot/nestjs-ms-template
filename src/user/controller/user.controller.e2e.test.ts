import * as request from 'supertest';
import { suite, test } from '@testdeck/jest';
import { BaseTest } from '@test/base-test';
import { UserFactory } from '@test/factory/user.factory';
import * as UserFixture from '@test/fixture/user.fixture.json';
import { HttpStatus } from '@nestjs/common';

@suite
export class UserControllerE2ETest extends BaseTest {
  @test
  async '[GET /user] If there are no users in the database, should return an empty array'() {
    return request(BaseTest.httpServer)
      .get('/user')
      .expect(HttpStatus.OK)
      .expect([]);
  }

  @test
  async '[GET /user] Should return all the users in the database'() {
    await new UserFactory().createOne(UserFixture);

    return request(BaseTest.httpServer)
      .get('/user')
      .expect(HttpStatus.OK)
      .expect([UserFixture]);
  }

  @test
  async '[POST /user] Given an user, should create it and return it'() {
    return request(BaseTest.httpServer)
      .post('/user')
      .send(UserFixture)
      .expect(HttpStatus.CREATED)
      .expect(UserFixture);
  }

  @test
  async '[POST /user] Given an user that already exists, should return a bad request exception'() {
    await new UserFactory().createOne(UserFixture);

    await request(BaseTest.httpServer)
      .post('/user')
      .send(UserFixture)
      .expect(HttpStatus.BAD_REQUEST);
  }
}
