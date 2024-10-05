# in.Orbit

# Next Level Week

A **Next Level Week** é um evento gratuito de programação na prática da Rocketseat, com o objetivo de desenvolver um projeto completo em uma semana, aprendendo novas tecnologias, desenvolvendo novas habilidades e evoluindo para o próximo nível como desenvolvedor.

## O projeto

**in.Orbit** é uma aplicação para gerenciamento de metas, e é o projeto desenvolvido durante a edição do evento conhecida como **NLW Pocket Javascript**.

![thumbnail](./.github/thumbnail.png)

## Funcionalidades

A aplicação desenvolvida contém as seguintes funcionalidades:

- Listar metas cadastradas
- Listar resumo de metas concluídas na semana atual
- Concluir uma meta
- Cadastrar uma nova meta

## Tecnologias

O presente projeto foi desenvolvido na trilha intermediária do evento, utilizando tecnologias como:

- NodeJS
- Fastify
- Zod
- Docker
- Postgresql
- Drizzle ORM
- ReactJS
- React Query
- React Hook Form
- Entre outras...

## Executando o projeto

Este projeto depende do Docker para configurar um banco de dados. Com o Docker instalado, clone o projeto, instale as dependências, configure os conteineres Docker e rode a aplicação.

> Você precisa criar um arquivo .env para configurar a variável de ambiente `DATABASE_URL`.

Crie um arquivo `.env` em `/server` com a url de conexão do seu banco de dados Postresql

```env
DATABASE_URL="postgresql://docker:docker@localhost:5432/inorbit"
```

Com o arquivo configurado, execute os comandos:

```bash
cd server/
npm i
docker compose up -d
npm run drizzle:migrate
npm run seed
npm run dev
```

> IMPORTANTE: O comando `npm run seed` insere alguns dados de exemplo no banco de dados, caso deseje iniciar a aplicação sem os dados de exemplo iniciais, basta pular o comando.

## Atualização do projeto

O código desenvolvido durante o evento consta na branch `evento`, onde permanecerá inalterada.

Com o propósito de aprendizado contínuo e aprofundamento, na branch `main` serão implementadas quaisquer melhorias e/ou novas funcionalidades da aplicação.

Modificações realizadas:
- **Autenticação:** Foi implementado um fluxo de autenticação funcional. Desde a criação e modificação das tabelas necessárias, cripptografia das senhas, consultas no database, rotas públicas e privadas.
  - > Entende-se que ainda é necessário melhorias no processo de autenticação.
- **Página de Login e Cadastro:** Foi criada uma página de Login e de Cadastro na aplicação. Além de uma página inicial que é apresentada quando não há usuário logado.
- **Página de usuário pública:** A página de metas do usuário é pública, podendo ser compartilhada, porém apenas o prórpio usuário pode realizar qualquer ação referente as próprias metas.

> **IMPORTANTE:** Foi criado uma nova variável de ambiente, `JWT_SECRET`, que é necessária para a execução dessa nova versão da aplicação.
