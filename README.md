# Form Builder Backend built with Prisma, GraphQL and PostgreSQL

This app was implemented as a form builder backend with the following stack:

- [**Express GraphQL**](https://github.com/graphql/express-graphql): Express middleware for GraphQL HTTP servers
- [**`makeExecutableSchema`**](https://www.graphql-tools.com/docs/generate-schema/) from [`graphql-tools`](https://github.com/ardatan/graphql-tools): Combines [resolvers and type definitions](https://www.prisma.io/blog/graphql-server-basics-the-schema-ac5e2950214e) into an executable schema.
- [**Prisma Client**](https://www.prisma.io/docs/concepts/components/prisma-client): Databases access (ORM)
- [**Prisma Migrate**](https://www.prisma.io/docs/concepts/components/prisma-migrate): Database migrations
- [**PostgreSQL**](https://www.postgresql.org): SQL database

## Getting started

### 1. Create and seed the database

Run the following command to create your SQLite database file. This also creates the `User` and `Post` tables that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```
npx prisma migrate dev --name init
```

When `npx prisma migrate dev` is executed against a newly created database, seeding is also triggered. The seed file in [`prisma/seed.ts`](./prisma/seed.ts) will be executed and your database will be populated with the sample data.

### 2. Start the GraphQL server

Launch your GraphQL server with this command:

```
npm run dev
```

Navigate to [http://localhost:4000/graphql](http://localhost:4000/graphql) in your browser to explore the API of your GraphQL server in a [GraphQL Playground](https://github.com/prisma/graphql-playground).

## Using the GraphQL API

The schema that specifies the API operations of your GraphQL server is defined in [`./schema.graphql`](./schema.graphql). Below are a number of operations that you can send to the API using the GraphQL Playground.

Feel free to adjust any operation by adding or removing fields. The GraphQL Playground helps you with its auto-completion and query validation features.
