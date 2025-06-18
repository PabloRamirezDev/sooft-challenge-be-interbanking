# SOOFT Challenge BE - Interbanking

- [Versión en Español](./README.es.md)

## Project setup

```bash
$ npm install
```

## Seed database

```bash
$ npm run seed
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Test Endpoints

1. Retrieve all companies that made transfers in last month.

```http
GET /companies?withTransfersAfter=last-month
```

2. Retrieve all companies that started in last month.

```http
GET /companies?startedAfter=last-month
```

3. Create a new company with type SME (PyME).

```http
POST /companies
Content-Type: application/json

{
	"companyName": "Test Company",
	"cuit": "12-34567890-3",
    "companyType": "sme"
}
```

## Assumptions

- It is not necessary to include a general endpoint to retrieve companies.
- As it is not required, querying by startedAfter and withTransfersAfter simultaneously is out of scope.
- Pagination is out of scope.
- Auth is out of scope.

## Design Decisions

- To keep a RESTful approach to the naming of endpoints (which is the standard), only two endpoints will be included in the service: a `GET /companies` and a `POST /companies`. Then, both features related to companies retrieval will be handled in the `GET` endpoint with different parameters.
- As suggested, the project follows a Hexagonal architecture. These are the key aspects:
    - Modules are separated into `core` and `infrastructure`. The core module includes the domain and application layers of the application. On the other hand, the infrastructure module implements the infrastructure layer, with the inbound and outbound adapters.
    - Nest.js controllers are part of the `HTTPServerModule` in the infrastructure layer, as it connects the application with the client through HTTP.
- An embedded SQLite database with TypeORM was used for the sake of simplicity, though another database provider could be implemented with minimal effort.
- Nest.js config module is used to manage configuration throughout the app.