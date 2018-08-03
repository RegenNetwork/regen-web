# regen.network MVP Server Code

## Starting PostgreSQL Locally

1. Install [docker-compose](https://docs.docker.com/compose/install/)
2. Run `docker-compose up`

## Run Postgres Migrations

This will update your local PostgreSQL schema to the latest version in the repository
using [Flyway](https://flywaydb.org/)

1. Make sure you have [Flyway](https://flywaydb.org/) installed. On OS X you can
run `brew install flyway`. If you have [Nix](https://nixos.org/nix/) installed on
linux you can use the provided `./flyway` script
2. Run `flyway migrate`
