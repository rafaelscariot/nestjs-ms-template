import { Test } from '@nestjs/testing';
import { INestApplication, Type, Logger } from '@nestjs/common';
import { AppModule } from '@src/app.module';
import { getDataSourceToken } from '@nestjs/typeorm';
import { ConnectionProviderEnum } from '@src/database/enum/connection-provider.enum';

export abstract class BaseTest {
  static logger: Logger;
  static app: INestApplication;
  static httpServer: string;

  static async before(): Promise<void> {
    BaseTest.logger = new Logger(BaseTest.name);

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    BaseTest.app = moduleRef.createNestApplication();
    BaseTest.app = await BaseTest.app.init();
    BaseTest.httpServer = BaseTest.app.getHttpServer();

    await BaseTest.clearDb();
  }

  async after(): Promise<void> {
    await BaseTest.clearDb();
  }

  async afterAll() {
    await BaseTest.app.close();
  }

  static async clearDb(): Promise<void> {
    const connections = [
      BaseTest.get(
        getDataSourceToken(
          ConnectionProviderEnum.POSTGRES_READ_CONNECTION,
        ) as string,
      ),
      BaseTest.get(
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
    return BaseTest.app.get(type);
  }
}
