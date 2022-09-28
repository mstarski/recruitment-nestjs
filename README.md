# Espeo hackerrank test (NestJS)

## How to start
1. Copy `config.example.yml` to `config.yml` in `config` directory
2. `npm ci`
3. `npm run start:dev`

## OpenAPI documentation
You can access generated swagger page at `http://localhost:{http.port}/docs`
(By default `http.port` is specified in `config.example.yml` as `8000`).

## Interview questions (notes)
1. Add a constraint so that adopting client cannot be under 18 years old
2. Add 'age' property to `CatEntity`
3. There can't be two cats that have the same name/breed pair assigned
5. Add info about current page to the paginated dto

## TODO:
- Hackerrank config (hackerrank.yml)
