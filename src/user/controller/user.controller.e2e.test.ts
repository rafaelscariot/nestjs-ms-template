import * as request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { suite, test } from '@testdeck/jest';
import { TestBaseE2E } from '@test/test-base.e2e';
import { UserRoleEnum } from '../enum/user-role.enum';
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
          id: userFixture.id,
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

  @test
  async '[GET /user/:email] Given the email, should return the user'() {
    await new UserFactory().createOne(userFixture);

    const { body } = await request(TestBaseE2E.httpServer)
      .get(`/user/${userFixture.email}`)
      .expect(HttpStatus.OK);

    expect(body).toStrictEqual({
      id: '881a53dc-ed23-11ed-a05b-0242ac120003',
      name: 'Adam Sandler',
      email: 'adam@email.com',
      role: UserRoleEnum.USER,
    });
  }

  @test
  async '[GET /user/:email] Given an email from a non-existent user, should return a BadRequestException'() {
    await request(TestBaseE2E.httpServer)
      .get('/user/zecapeta@hotmail.com')
      .expect(HttpStatus.BAD_REQUEST);
  }
}
