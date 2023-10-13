import { Test } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { getDataSourceToken } from '@nestjs/typeorm';
import { AuthGuard } from '@src/auth/guard/auth.guard';
import { INestApplication, Type, Logger } from '@nestjs/common';
import { ConnectionProviderEnum } from '@src/database/enum/connection-provider.enum';

export abstract class TestBaseE2E {
  static logger: Logger;
  static httpServer: string;
  static app: INestApplication;

  static async before(): Promise<void> {
    TestBaseE2E.logger = new Logger(TestBaseE2E.name);

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(AuthGuard)
      .useValue({
        canActivate: () => {
          return true;
        },
      })
      .compile();

    TestBaseE2E.app = moduleRef.createNestApplication();
    TestBaseE2E.app = await TestBaseE2E.app.init();
    TestBaseE2E.httpServer = TestBaseE2E.app.getHttpServer();

    await TestBaseE2E.clearDb();
  }

  async after(): Promise<void> {
    await TestBaseE2E.clearDb();
  }

  async afterAll() {
    await TestBaseE2E.app.close();
  }

  static async clearDb(): Promise<void> {
    const connections = [
      TestBaseE2E.get(
        getDataSourceToken(
          ConnectionProviderEnum.POSTGRES_READ_CONNECTION,
        ) as string,
      ),
      TestBaseE2E.get(
        getDataSourceToken(
          ConnectionProviderEnum.POSTGRES_WRITE_CONNECTION,
        ) as string,
      ),
    ];

    for (const connection of connections) {
      const entities = connection.entityMetadatas;

      for (const entity of entities) {
        const repository = connection.getRepository(entity.name);

        try {
          await repository.query(
            `TRUNCATE TABLE public.${entity.tableName} RESTART IDENTITY CASCADE;`,
          );
        } catch (error) {
          this.logger.error(`Error in truncate table ${entity.tableName}`);
        }
      }
    }
  }

  static get<TInput = any, TResult = TInput>(
    type: Type<TInput> | string | symbol,
  ): TResult {
    return TestBaseE2E.app.get(type);
  }
}
