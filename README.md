## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docker
https://hub.docker.com

docker pull mongo

https://www.mongodb.com/try/download/compass

```yaml
version: '3'

services:
  db:
    container_name: mean-db  # nombre del contenedor que tendremos
    image: mongo:5.0.16  # imagen de docker y versión que usaremos
    volumes:  # persistir la data
      - ./mongo:/data/db  # grabamos la data en este directorio
    ports:  # montamos el contenedor para que la imagen funcione
      - 27017:27017  # mapeamos el puerto 27017 de mi equipo en el puerto 27017 del contenedor
    restart: always  # cada que se reinicie la BD, la base de datos esté arriba
```

```bash
# docker
$ docker compose up -d
```
