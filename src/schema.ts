import { makeExecutableSchema } from '@graphql-tools/schema'
import { DateTimeResolver } from 'graphql-scalars'
import { Context } from './context'

const typeDefs = `
type Mutation {
  createForm(name: String!, form: String!): Form
}

type Form {
  id: Int!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
  form: String!
}

type Query {
  allForms: [Form!]!
}

scalar DateTime
`

const resolvers = {
  Query: {
    allForms: (_parent: any, _args: any, context: Context) => {
      return context.prisma.form.findMany()
    },
  },
  Mutation: {
    createForm: (
      _parent: any,
      args: { name: string; form: string },
      context: Context,
    ) => {
      return context.prisma.form.create({
        data: {
          name: args.name,
          form: args.form,
        },
      })
    },
  },
  DateTime: DateTimeResolver,
}

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})
