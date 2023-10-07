import * as request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { suite, test } from '@testdeck/jest';
import { TestBaseE2E } from '@test/test-base.e2e';
import { UserFactory } from '@test/factory/user.factory';
import { userFixture } from '@test/fixture/user.fixture';

@suite
export class UserControllerE2ETest extends TestBaseE2E {
  @test
  async '[GET /user] If there are no users in the database, should return an empty array'() {
    return request(TestBaseE2E.httpServer)
      .get('/user')
      .expect(HttpStatus.OK)
      .expect([]);
  }

  @test
  async '[GET /user] Should return all the users in the database'() {
    await new UserFactory().createOne(userFixture);

    return request(TestBaseE2E.httpServer)
      .get('/user')
      .expect(HttpStatus.OK)
      .expect([
        {
          name: userFixture.name,
          email: userFixture.email,
          role: userFixture.role,
        },
      ]);
  }

  @test
  async '[POST /user] Given an user, should create it and return it'() {
    return request(TestBaseE2E.httpServer)
      .post('/user')
      .send(userFixture)
      .expect(HttpStatus.CREATED);
  }

  @test
  async '[POST /user] Given an user that already exists, should return a bad request exception'() {
    await new UserFactory().createOne(userFixture);

    await request(TestBaseE2E.httpServer)
      .post('/user')
      .send(userFixture)
      .expect(HttpStatus.BAD_REQUEST);
  }
}
