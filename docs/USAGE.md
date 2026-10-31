# Guia de uso

## Pré-requisitos

- Node.js 20+
- MongoDB
- Credenciais AWS S3 para imagens, se esse recurso for utilizado

## Preparar o ambiente

```bash
npm install
cp .env.example .env
```

Preencha `MONGO_URL`, `PORT`, `PUBLIC_URL`, `NODE_ENV` e `JWT_SECRET`. Configure também `AWS_S3_BUCKET`, `AWS_ACCESS_KEY_ID` e `AWS_SECRET_ACCESS_KEY` quando houver upload.

## Subir a API

```bash
npm run start:dev
```

Use um token JWT no header `Authorization: Bearer <token>` para as rotas protegidas.

## Operações de carrinho

```bash
curl http://localhost:${PORT}/cart \
  -H "Authorization: Bearer <token>"
```

Para criar ou atualizar com imagem, envie `multipart/form-data` para `POST /cart` ou `PATCH /cart/:id`, usando o campo `image`. Os campos restantes devem seguir os DTOs em `src/modules/carts/dtos`.

Operações disponíveis:

- listar com `GET /cart`;
- filtrar por `userEmail` ou `model`;
- consultar com `GET /cart/:id`;
- editar com `PATCH /cart/:id`;
- marcar favorito com `PATCH /cart/:id/favorite`;
- excluir com `DELETE /cart/:id` ou `POST /cart/delete-many`.

## Testes

```bash
npm test
npm run test:e2e
```
