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

## Conectar nest con mongo

https://docs.nestjs.com/techniques/mongodb

```bash
# mongoose
$ npm i @nestjs/mongoose mongoose
```

Copiar .env.template a .env y usar la conexión correcta

Para las varaibles de entorno
```bash
# mongoose
$ npm i @nestjs/config
```

## Usar mongo

Primero debemos crear la base de datos en mongo. en las .env podemos luego del puerto colocar /nombre_db

## Dto

Para definir correctamente el como lucirán los dto
```bash
# class validator
$ npm i class-validator class-transformer
```

Se debe configurar de manera global

```typescript
app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  )
```

## Encriptar contraseña
```bash
# bcrypts js
$ npm i bcryptjs
$ npm i --save-dev @types/bcryptjs
```

## JWT 

https://docs.nestjs.com/security/authentication#jwt-token

Estándar para comunicación de forma pasiva entre el front y el back

A la hora de usar los tokens, en postman vamos a la pestaña de Auth y seleccionamos "Bearer token"

## Despliegue a producción

El objetivo de esta sección es desplegar a producción nuestra base de datos, backend y frontend para poder ser consumidos en cualquier parte del mundo.

Puntualmente veremos:
- Aprovisionamiento de base de datos MongoDB
- Railway y MongoAltas
- Variables de entorno para producción
- Hash Strategy
- Publicar aplicación de Node (Nest)
- Publicar aplicación de Angular
- Seleccionar bases de datos
- Pruebas reales.

### Pasos Mongo
1. Aprovisionar MongoDB desde Railway. https://railway.app
2. Iniciar sesión y click en new project
3. Provisional MongoDB
4. La seleccionamos y añadimos una nueva db
5. Seleccionar conexión donde están las variables de entorno y la cadena de conexión

### Pasos Back
1. Cambiar la URI de las .env por la proporcionada por railway
2. Añadimos una variable de entorno para el nombre de la base de datos
3. En el app.module en el modulo de mongo añadimos dbName: process.env.DB_NAME
4. Cambiar el puerto colocando process.env.PORT ?? 3000
5. Tener todo el proyecto subido a github
6. Cambiar el script de start por node dist/main (esto es lo que ejecuta railway. Es opcional este paso)
7. Ir a railway crear un nuevo proyecto y darle desplegar desde github (Antes del deploy now añadimos las variables de entorno). Se despliega automáticamente
8. Ir a la configuración del proyecto en railway e ir a setting domain y generate domain lo que nos dará el endpoint