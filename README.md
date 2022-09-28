# Espeo hackerrank test (NestJS)

## How to start

1. Copy `config.example.yml` to `config.yml` in `config` directory
2. `npm ci`
3. `npm run start:dev`

## OpenAPI documentation

You can access generated swagger page at `http://localhost:{http.port}/docs`
(By default `http.port` is specified in `config.example.yml` as `8000`).

## Features to implement:

1. Block adoption for people under 18 years old. (`adoption-manager.spec.ts`)
2. Cats should have `age` property inside the db and it should be nullable. (`entities.spec.ts`)
3. There can't be two cats that have the same name/breed pair assigned (`entities.spec.ts`)
4. Paginated data should also contain data about currently viewed page (`infra.spec.ts`)

## Useful commands

```bash
$ npm run test # run tests
```

```bash
$ npm run start:dev # start an application
```
