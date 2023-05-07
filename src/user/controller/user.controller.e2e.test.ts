import * as request from 'supertest';
import { suite, test } from '@testdeck/jest';
import { BaseTest } from '@test/base-test';

@suite
export class UserControllerE2ETest extends BaseTest {
  @test
  async '[GET /user] If there are no users in the database, it should return an empty array'() {
    return request(BaseTest.httpServer).get('/user').expect(200).expect([]);
  }
}
