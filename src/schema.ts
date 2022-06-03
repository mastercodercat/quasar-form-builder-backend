import { makeExecutableSchema } from '@graphql-tools/schema'
import { DateTimeResolver } from 'graphql-scalars'
import { Context } from './context'

const typeDefs = `
type Mutation {
  createForm(name: String!, form: String!): Form
  createDropdownList(name: String!, items: [String!]): DropdownList
}

type Form {
  id: Int!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
  form: String!
}

type DropdownItem {
  id: Int!
  name: String!
}

type DropdownList {
  id: Int!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
  items: [DropdownItem]!
}

type Query {
  allForms: [Form!]!
  allDropdownLists: [DropdownList!]!
}

scalar DateTime
`

const resolvers = {
  Query: {
    allForms: (_parent: any, _args: any, context: Context) => {
      return context.prisma.form.findMany()
    },
    allDropdownLists: (_parent: any, _args: any, context: Context) => {
      return context.prisma.dropdownList.findMany({
        include: {
          items: true,
        },
      })
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
    createDropdownList: (
      _parent: any,
      args: { name: string; items: Array<string> },
      context: Context,
    ) => {
      return context.prisma.dropdownList.create({
        data: {
          name: args.name,
          items: {
            create: args.items.map((item) => ({
              name: item,
            })),
          },
        },
        include: {
          items: true,
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
