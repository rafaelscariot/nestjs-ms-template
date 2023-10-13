API template with unit and end to end tests, ORM set to multiple databases, endpoint documentation with OpenAPI, migrations and seed to populate the local databases, authorization with an API Key and authentication through Json Web Token.

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

# migrations and seed
$ yarn db:create

# start in watch mode
$ yarn start:dev
```

Access the API docs on _localhost:3000/api_.

## Other scripts

# start in production mode

```bash
$ yarn start:prod
```

# migrations and seed individually

```bash
$ yarn migrate
$ yarn seed
```

# database reset

```bash
$ yarn db:reset
```

## Tests

_controller_ have an end to end test covering all the request layers.
_service_ have a unit test covering the service logic and mocking external things to it.

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
