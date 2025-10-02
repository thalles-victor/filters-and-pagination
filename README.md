# Migrations - Projeto Node.js + PostgreSQL

Este projeto utiliza um sistema simples de migrations para gerenciar alterações no banco de dados PostgreSQL.  
As migrations são arquivos `.sql` localizados na pasta `/src/migrations`. Cada migration é registrada na tabela `migrations` para garantir que seja executada apenas uma vez.

## Pré-requisitos

- Node.js >= 18
- PostgreSQL rodando localmente ou em container
- Pasta de migrations: `/src/migrations`

## Criar uma nova migration

Use o script `createMigration.js` para criar um arquivo de migration com timestamp no nome, garantindo a ordem de execução:

```bash
node createMigration.js <nome_da_migration>
```

## Instalando as dependências
Antes de ir para etapa de executar o projeto, instale as dependências.

```
npm install
```

## Subindo o banco de dados com o docker
para subir o banco de dados com o docker rode o comando:

```sh
docker compose up -d
```

## Executa todas as migrations
Assim que já tiver arquivos de migration criados, você pode executar os script abaixo para criar as migrations

```bash
node exec-migrations.js 
```

## Preenchendo o banco de dados com 10.000 carros
Para preencher o banco com 10 mil carros aleatórios rode o comando baixo:
```
node seed.js
```

## Executando o servidor
para executar o servidor rode o comando:
```
npm run dev
```

## Exemplos de uso:
Os parâmetros de paginação e busca devem ser usados como no exemplo abaixo

Você pode usar os seguintes parâmetros diretamente na URL:

brand → Filtra pela marca do carro (ex: Ford)

model → Filtra pelo modelo (ex: Model A)

year → Filtra pelo ano do carro (ex: 2020)

minPrice → Preço mínimo (ex: 20000)

maxPrice → Preço máximo (ex: 50000)

limit → Quantidade de itens por página (default: 10)

page → Número da página (default: 1)
```sh
curl "http://localhost:3333/cars?brand=Ford&model=Model&year=2020&minPrice=20000&maxPrice=50000&limit=5&page=2"
```

a resposta vai ser como no exemplo abaixo:
```json
{
  "data": [
    {
      "id": 12,
      "brand": "Ford",
      "model": "Model A",
      "year": 2020,
      "price": 35000,
      "created_at": "2025-10-01T15:00:00.000Z"
    },
    {
      "id": 27,
      "brand": "Ford",
      "model": "Model A",
      "year": 2020,
      "price": 42000,
      "created_at": "2025-10-01T15:01:00.000Z"
    }
  ],
  "meta": {
    "total": 12,
    "totalPages": 3,
    "currentPage": 2,
    "limit": 5
  }
}
```

Parametros no modelo REST/RESTFUL

route params
```
/users/:id -> users/0 | users/1
/users/:name -> users/thalles | users/jose
```

```json
body params
{
  "name": "thalles",
  "email": "thalles@gmail.com"
}
```

```
<?xml version="1.0" encoding="UTF-8"?>
<user>
  <name>thalles</name>
  <email>thalles@gmail.com</email>
</user>

```

headers params
```
Authorization: Bearer token.....
Content-Type: "application/json" "text" "xml"
```

query params
```
/users?page=1&limit=100&name=jose&utm_ad=
/pages
```