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
# containers
$ docker-compose up -d

# migrations
$ yarn migrate

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```
Access the API docs on _localhost:3000/api_.

## Test

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
