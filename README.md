API template with unit and end to end tests, ORM set to multiple databases, endpoint documentation with OpenAPI and migrations to populate the local databases.

Technologies used:

- [Nest.js](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [Jest](https://jestjs.io/pt-BR/)
- [Docker](https://www.docker.com/)
- [Postgres](https://www.postgresql.org/)

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# container
$ docker-compose up -d

# migration
$ yarn migrate

# database seed
$ yarn seed

# start in watch mode
$ yarn start:dev

# start in production mode
$ yarn start:prod
```

Access the API docs on _localhost:3000/api_.

## Test

All _controller_ have an end to end test covering all the request layers.
All _service_ have a unit test covering the service logic and mocking external things to it.

```bash
# all tests
$ yarn test

# unit tests
$ yarn test:unit

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Stay in touch

- Author - [Rafael Scariot](https://www.linkedin.com/in/rafaelscariot/)
