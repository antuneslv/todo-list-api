# ToDo List API

<br/>

Esse projeto consiste na criação de uma API REST Back-End de uma ToDo List.

<br/>

## Quick Start

<br/>

### Instalando as dependências

<br/>

```sh
yarn
```

<br/>

## Configurações iniciais

<br/>

Após instalar as dependências, configure as variáveis de ambiente de acordo com com o modelo do arquivo do **.env.template**, utilizando uma conexão com seu banco de dados _Postgresql_, a porta de sua preferência para iniciar o servidor e uma chave secreta para gerar o token de autenticação.

<br/>

### Iniciando o Projeto

<br/>

Execute o servidor com esse comando a partir da raiz do projeto:

```sh
yarn dev
```

<br/>

### Rodando as Migrations

<br/>

Criar migration:

```sh
prisma migrate dev
```

<br/>

### Endpoints

**User** <br/>
[`POST /signup`](#post-signup) - Criação de um novo usuário <br/>
[`POST /login`](#post-login) - Autenticação de usuário (login) <br/>
[`GET /user`](#get-user) - Busca do usuário <br/>
[`PUT /user/update`](#put-userupdate) - Atualização de dados do usuário <br/>
[`DELETE /user/delete`](#delete-userdelete) - Deleção do usuário <br/>

<br/>

**ToDo** <br/>
[`POST /todo/new`](#post-todonew) Criação de um novo ToDo <br/>
[`GET /todo/:id?`](#get-todoid) Busca de um ou todos os ToDos <br/>
[`PUT /todo/update/:id`](#put-todoupdateid) Atualização de dados do ToDo <br/>
[`DELETE /todo/delete/:id`](#delete-tododeleteid) - Deleção do ToDo <br/>

##

### POST /signup

**Request**

| **Body** | **Obrigatório** | **Tipo** | **Descrição**            |
| :------- | :-------------- | :------- | :----------------------- |
| name     | sim             | `string` | Nome completo do usuário |
| email    | sim             | `string` | E-mail                   |
| password | sim             | `string` | Senha                    |

<br />

**Response**

Sucesso

`201 Created`

```json
{
  "id": "ce113593-d801-4225-9cbb-107933218121",
  "name": "John Doe",
  "email": "john_doe@email.com",
  "created_at": "2022-09-28T16:53:49.896Z",
  "updated_at": "2022-09-28T16:53:49.897Z"
}
```

<br />

Erro

`400 Bad Request`

```json
{
  "error": "Missing data"
}
```

<br />

`409 Conflict`

```json
{
  "error": "E-mail already registred"
}
```

<br/>

##

### POST /login

**Request**

| **Body** | **Obrigatório** | **Tipo** | **Descrição** |
| :------- | :-------------- | :------- | :------------ |
| email    | sim             | `string` | E-mail        |
| password | sim             | `string` | Senha         |

<br />

**Response**

Sucesso

`200 OK`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJqb2huX2RvZUBlbWFpbC5jb20iLCJpYXQiOjE2NjQzODQwNzQsImV4cCI6MTY2NDM4NzY3NCwic3ViIjoiY2UxMTM1OTMtZDgwMS00MjI1LTljYmItMTA3OTMzMjE4MTIxIn0._hwAgqFrWCouiwSY7hTNmdZgyEUcBkkzhsOtiFqK4UI",
  "user": {
    "id": "ce113593-d801-4225-9cbb-107933218121",
    "name": "John Doe",
    "email": "john_doe@email.com"
  }
}
```

<br />

Erro

`400 Bad Request`

```json
{
  "error": "Missing data"
}
```

<br />

`403 Forbidden`

```json
{
  "error": "E-mail or password invalid"
}
```

<br/>

##

### GET /user

**Request**

| **Headers**   | **Obrigatório** | **Tipo** | **Descrição** |
| :------------ | :-------------- | :------- | :------------ |
| Authorization | sim             | `string` | Bearer Token  |

<br />

**Response**

Sucesso

`200 OK`

```json
{
  "id": "ce113593-d801-4225-9cbb-107933218121",
  "name": "John Doe",
  "email": "john_doe@email.com",
  "created_at": "2022-09-28T16:53:49.896Z",
  "updated_at": "2022-09-28T16:53:49.897Z"
}
```

<br />

Erro

`404 Not Found`

```json
{
  "error": "User not found"
}
```

<br/>

##

### PUT /user/update

**Request**

| **Headers**   | **Obrigatório** | **Tipo** | **Descrição** |
| :------------ | :-------------- | :------- | :------------ |
| Authorization | sim             | `string` | Bearer Token  |

<br />

| **Body** | **Obrigatório** | **Tipo** | **Descrição**            |
| :------- | :-------------- | :------- | :----------------------- |
| name     | sim             | `string` | Nome completo do usuário |
| email    | sim             | `string` | E-mail                   |
| password | sim             | `string` | Senha                    |

<br />

**Response**

Sucesso

`200 OK`

```json
{
  "id": "ce113593-d801-4225-9cbb-107933218121",
  "name": "John Doe II",
  "email": "john_doe@email.com",
  "created_at": "2022-09-28T16:53:49.896Z",
  "updated_at": "2022-09-28T22:29:55.859Z"
}
```

<br />

Erro

`400 Bad Request`

```json
{
  "error": "Missing data"
}
```

<br />

`404 Not Found`

```json
{
  "error": "User not found"
}
```

<br/>

`409 Conflict`

```json
{
  "error": "E-mail already registred"
}
```

<br/>

##

### DELETE /user/delete

**Request**

| **Headers**   | **Obrigatório** | **Tipo** | **Descrição** |
| :------------ | :-------------- | :------- | :------------ |
| Authorization | sim             | `string` | Bearer Token  |

<br />

**Response**

Sucesso

`204 No Content`

<br />

Erro

`404 Not Found`

```json
{
  "error": "User not found"
}
```

<br/>

##

### POST /todo/new

**Request**

| **Headers**   | **Obrigatório** | **Tipo** | **Descrição** |
| :------------ | :-------------- | :------- | :------------ |
| Authorization | sim             | `string` | Bearer Token  |

<br />

| **Body**    | **Obrigatório** | **Tipo**  | **Descrição**                  |
| :---------- | :-------------- | :-------- | :----------------------------- |
| description | sim             | `string`  | Descrição do ToDo              |
| is_done     | sim             | `boolean` | Tarefa concluída/não concluída |

<br />

**Response**

Sucesso

`201 Created`

```json
{
  "id": 1,
  "id_user": "ce113593-d801-4225-9cbb-107933218121",
  "description": "Fazer compras",
  "is_done": false,
  "created_at": "2022-09-28T22:48:03.644Z",
  "updated_at": "2022-09-28T22:48:03.655Z"
}
```

<br />

Erro

`400 Bad Request`

```json
{
  "error": "Missing data"
}
```

<br />

##

### GET /todo/:id?

**Request**

| **Headers**   | **Obrigatório** | **Tipo** | **Descrição** |
| :------------ | :-------------- | :------- | :------------ |
| Authorization | sim             | `string` | Bearer Token  |

| **Params** | **Obrigatório** | **Tipo** | **Descrição** |
| :--------- | :-------------- | :------- | :------------ |
| id         | não             | `string` | id do ToDo    |

<br />

> **_NOTA:_** Se não for passado o parâmetro de rota id, será feita a busca de todos os ToDos daquele usuário, senão é buscado o ToDo específico.

<br />

**Response**

Sucesso

`200 OK`

```json
{
  "id": 1,
  "id_user": "ce113593-d801-4225-9cbb-107933218121",
  "description": "Fazer compras",
  "is_done": false,
  "created_at": "2022-09-28T22:48:03.644Z",
  "updated_at": "2022-09-28T22:50:30.913Z"
}
```

<br />

Erro

`404 Not Found`

```json
{
  "error": "ToDo not found"
}
```

<br/>

##

### PUT /todo/update/:id

**Request**

| **Headers**   | **Obrigatório** | **Tipo** | **Descrição** |
| :------------ | :-------------- | :------- | :------------ |
| Authorization | sim             | `string` | Bearer Token  |

<br />

| **Params** | **Obrigatório** | **Tipo** | **Descrição** |
| :--------- | :-------------- | :------- | :------------ |
| id         | sim             | `string` | id do ToDo    |

<br />

| **Body**    | **Obrigatório** | **Tipo**  | **Descrição**                  |
| :---------- | :-------------- | :-------- | :----------------------------- |
| description | sim             | `string`  | Descrição do ToDo              |
| is_done     | sim             | `boolean` | Tarefa concluída/não concluída |

<br />

**Response**

Sucesso

`200 OK`

```json
{
  "id": 1,
  "id_user": "ce113593-d801-4225-9cbb-107933218121",
  "description": "Fazer compras do mês",
  "is_done": true,
  "created_at": "2022-09-28T22:48:03.644Z",
  "updated_at": "2022-09-28T23:20:51.955Z"
}
```

<br/>

Erro

`404 Not Found`

```json
{
  "error": "ToDo not found"
}
```

<br/>

`400 Bad Request`

```json
{
  "error": "Missing data"
}
```

<br/>

### DELETE /todo/delete/:id

**Request**

| **Headers**   | **Obrigatório** | **Tipo** | **Descrição** |
| :------------ | :-------------- | :------- | :------------ |
| Authorization | sim             | `string` | Bearer Token  |

<br />

| **Params** | **Obrigatório** | **Tipo** | **Descrição** |
| :--------- | :-------------- | :------- | :------------ |
| id         | sim             | `string` | id do ToDo    |

<br />

**Response**

Sucesso

`204 No Content`

<br/>

Erro

`404 Not Found`

```json
{
  "error": "ToDo not found"
}
```

<br/>

##

### Outros Erros

<br/>

O erro abaixo pode ser ocasionado falta de envio do token do header Authorization.

`401 Unauthorized`

```json
{
  "error": "Missing token"
}
```

<br />

O erro abaixo pode ser ocasionado por envio de um token inválido ou expirado.

`401 Unauthorized`

```json
{
  "error": "Unauthorized"
}
```

<br />

Erro genério `404 Not Found` pode ser ocasionado por uma rota passada errada ou com parâmetros faltando.

<br/>

## Licença

<br/>

[MIT](LICENSE)
