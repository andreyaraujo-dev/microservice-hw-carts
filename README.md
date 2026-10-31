# Microservice HW Carts

API REST para cadastro e gerenciamento de carrinhos, construída com NestJS, MongoDB e armazenamento opcional de imagens no Amazon S3.

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=node.js)
![NestJS](https://img.shields.io/badge/NestJS-10-E0234E?logo=nestjs)

## Visão geral

O serviço centraliza carrinhos associados a usuários e oferece operações autenticadas para listar, consultar, criar, editar, favoritar e excluir registros. Imagens podem ser enviadas como `multipart/form-data` e armazenadas no S3.

## Stack

- Node.js e TypeScript
- NestJS
- MongoDB com Mongoose
- JWT e Passport para autenticação
- AWS S3 para imagens
- Jest para testes

## Configuração local

Pré-requisitos: Node.js 20+, MongoDB acessível e, para imagens, um bucket S3 configurado.

```bash
npm install
cp .env.example .env
```

Preencha no `.env` pelo menos `MONGO_URL`, `PORT`, `PUBLIC_URL`, `NODE_ENV` e `JWT_SECRET`. As credenciais e o bucket AWS são necessários para os fluxos de imagem.

## Executando

```bash
npm run start:dev
```

Outros comandos:

```bash
npm run build
npm run start:prod
npm test
npm run test:e2e
```

Por padrão, a API expõe a rota de saúde em `GET /` e os recursos de carrinho sob `/cart`. As rotas de carrinho exigem autenticação JWT.

## Endpoints principais

| Método | Rota | Finalidade |
| --- | --- | --- |
| `GET` | `/cart` | Lista carrinhos, com filtros opcionais |
| `POST` | `/cart` | Cria carrinho e pode receber imagem |
| `GET` | `/cart/:id` | Consulta um carrinho |
| `PATCH` | `/cart/:id` | Atualiza um carrinho |
| `DELETE` | `/cart/:id` | Exclui um carrinho |
| `POST` | `/cart/delete-many` | Exclui vários carrinhos |
| `PATCH` | `/cart/:id/favorite` | Alterna o favorito |

Veja o fluxo completo de configuração e exemplos em [`docs/USAGE.md`](docs/USAGE.md).

## Estrutura

```text
src/
├── modules/auth       # estratégia e guarda JWT
├── modules/carts      # controller, serviço, repositório e schema
└── modules/shared     # configuração, filtros, logger e S3
```

## Screenshots

Adicione os prints do frontend relacionado a este serviço em [`assets/screenshots/`](assets/screenshots/). Para exibir uma imagem, use este modelo:

```md
<!-- ![Descrição da tela](assets/screenshots/nome-do-arquivo.png) -->
```
