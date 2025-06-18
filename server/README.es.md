# SOOFT Challenge BE - Interbanking

## Configuración del proyecto

```bash
$ npm install

# Usuarios de Linux y Mac
$ cp .env.example .env

# Usuarios de Windows
$ copy .env.example .env
```

## Poblar la base de datos

```bash
$ npm run seed
```

## Compilar y ejecutar el proyecto

```bash
# desarrollo
$ npm run start

# modo desarrollo
$ npm run start:dev

# modo producción
$ npm run start:prod
```

## Ejecutar tests

```bash
# tests unitarios
$ npm run test

# tests end-to-end
$ npm run test:e2e

# cobertura de tests
$ npm run test:cov
```

## Endpoints de prueba

1. Obtener todas las empresas que realizaron transferencias en el último mes.

```http
GET /companies?withTransfersAfter=last-month
```

2. Obtener todas las empresas que se adhirieron en el último mes.

```http
GET /companies?startedAfter=last-month
```

3. Crear una nueva empresa de tipo PyME.

```http
POST /companies
Content-Type: application/json

{
	"companyName": "Test Company",
	"cuit": "12-34567890-3",
    "companyType": "sme"
}
```

## Dudas asumidas

- No es necesario incluir un endpoint general para obtener todas las empresas.
- Como no se requiere, la consulta con ambos parámetros `startedAfter` y `withTransfersAfter` al mismo tiempo queda fuera de scope.
- La paginación está fuera de scope.
- La autenticación está fuera de scope.
- El CUIT se valida tomando [esta implementación](https://wiki.python.org.ar/recetario/validarcuit/) como referencia.

## Decisiones de diseño

- Para mantener un enfoque RESTful en la nomenclatura de los endpoints (que es el estándar), solo se incluirán dos endpoints en el servicio: un `GET /companies` y un `POST /companies`. Luego, ambas funcionalidades relacionadas con la obtención de empresas se manejarán en el endpoint `GET` con diferentes parámetros.
- Como se sugirió, el proyecto sigue una arquitectura Hexagonal. Estos son los aspectos clave:
  - Los módulos están separados en `core` e `infrastructure`. El módulo `core` incluye las capas de dominio y aplicación de la aplicación. Por otro lado, el módulo `infrastructure` implementa la capa de infraestructura, con los adaptadores de entrada y salida.
  - Los controladores de Nest.js forman parte del `HTTPServerModule` en la capa de infraestructura, ya que conecta la aplicación con el cliente a través de HTTP.
- Se utilizó una base de datos SQLite embebida con TypeORM por simplicidad, aunque se podría implementar otro proveedor de base de datos con un esfuerzo mínimo.
- Se utiliza el módulo de configuración de Nest.js para gestionar la configuración en toda la aplicación.