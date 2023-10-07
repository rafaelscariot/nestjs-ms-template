import * as request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { suite, test } from '@testdeck/jest';
import { TestBaseE2E } from '@test/test-base.e2e';
import { UserFactory } from '@test/factory/user.factory';
import { userFixture } from '@test/fixture/user.fixture';

@suite
export class AuthControllerE2ETest extends TestBaseE2E {
  @test
  async '[POST /auth] Given a valid user, should be authenticated'() {
    await new UserFactory().createOne(userFixture);

    return request(TestBaseE2E.httpServer)
      .post('/auth')
      .send({ email: userFixture.email, password: userFixture.password })
      .expect(HttpStatus.OK);
  }

  @test
  async '[POST /auth] Given a wrong password, should return an unauthorized status'() {
    await new UserFactory().createOne(userFixture);

    return request(TestBaseE2E.httpServer)
      .post('/auth')
      .send({ email: userFixture.email, password: 'wrongpass' })
      .expect(HttpStatus.UNAUTHORIZED);
  }

  @test
  async '[POST /auth] Given a non-existing user, should return a not found status'() {
    return request(TestBaseE2E.httpServer)
      .post('/auth')
      .send({ email: userFixture.email, password: userFixture.password })
      .expect(HttpStatus.NOT_FOUND);
  }

  @test
  async '[POST /auth] Given an invalid body, should return a bad request status'() {
    return request(TestBaseE2E.httpServer)
      .post('/auth')
      .send({ email: undefined, password: undefined })
      .expect(HttpStatus.BAD_REQUEST);
  }
}
