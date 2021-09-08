# Burger Queen - API con Node.js

## Índice

* [1. Preámbulo](#1-Pre%C3%A1mbulo)
* [2. Resumen del proyecto](#2-Resumen-del-proyecto)
* [3. Recursos Utilizados](#3-Recursos-Utilizados)
* [4. Requerimientos del cliente](#4-Requerimientos-del-cliente)
* [5. Endpoints](#5-Endpoints)
* [6. Dependencias](#6-Dependencias)
* [7.  Funcionamiento en Postman](#7-Funcionamiento-en-Postman)
* [8. HTTP API Checklist](#7-HTTP-API-Checklist)

## 1. Preámbulo

![Node.js logo](https://nodejs.org/static/images/logos/nodejs-new-pantone-black.svg)

Este proyecto es una API pensada para un pequeño restaurante de hamburguesas, que está creciendo, necesita un
sistema a través del cual puedan tomar pedidos usando una _tablet_, y enviarlos
a la cocina para que se preparen ordenada y eficientemente.



## 2. Resumen del proyecto

API  o un _servidor web_,es un programa que _escucha_ en un puerto de red, a través del cual podemos enviar _consultas_ (_request_) y obtener _respuestas_ (_response_)
usando el protocolo HTTP (o HTTPS).


## 3. Recursos Utilizados

* [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [docker](https://docs.docker.com/)
* [docker compose](https://docs.docker.com/compose/)
* [¿Qué es Docker? | Curso de Docker | Platzi Cursos](https://youtu.be/hQgvt-s-AHQ)
* [Postman](https://www.getpostman.com)
* [Variable de entorno - Wikipedia](https://es.wikipedia.org/wiki/Variable_de_entorno)
* [`process.env` - Node.js docs](https://nodejs.org/api/process.html#process_process_env)



## 4. Requerimientos del cliente


 [link a la documentación](https://laboratoria.github.io/burger-queen-api/)


## . Correr Test


### Pruebas e2e sobre URL remota
* npm run test:e2e
### Pruebas unitarias
* npm run test:unit

## 5. Endpoints:

#### 5.1.1 `/`

* `GET /`

#### 5.1.2 `/auth`

* `POST /auth`

#### 5.1.3 `/users`

* `GET /users`
* `GET /users/:uid`
* `POST /users`
* `PUT /users/:uid`
* `DELETE /users/:uid`

#### 5.1.4 `/products`

* `GET /products`
* `GET /products/:productid`
* `POST /products`
* `PUT /products/:productid`
* `DELETE /products/:productid`

#### 5.1.5 `/orders`

* `GET /orders`
* `GET /orders/:orderId`
* `POST /orders`
* `PUT /orders/:orderId`
* `DELETE /orders/:orderId`

## 6. Dependencias
* npm install @shelf/jest-mongodb
* npm install node-fetch
* npm install mongoose-paginate-v2
* npm install cors
* npm install express-validator
* npm install mongoose@5.2.8
* npm install --save moment 
* npm install bcrypt
* npm install body-parser
* npm install mongoose-paginate-v2
* npm install cors
* npm install express
* npm install jsonwebtoken
* npm install mongoose    

## 7. Funcionamiento en Postman
**Creación de Usuario Admin**
![Alt Text](https://giphy.com/gifs/YNYOqvtvCDg41ooSby)

**Obtener Token**
![Alt Text](https://giphy.com/gifs/ZFgRTXz2ZF4vOw0ho3)

**Crear nuevo Producto**
![Alt Text](https://giphy.com/gifs/ExVsumyC0nXqUuxJC0)

**Agregar producto a Orden**
![Alt Text](https://giphy.com/gifs/YpTCwWiqVK0sOfUS29)

## 8. Diagrama de flujo del JWT


<p align="center">
  <img src="https://miro.medium.com/max/788/1*0t7t3_pFzIaRXoYr1wTXIA.jpeg" width="350" title="hover text">
 
</p