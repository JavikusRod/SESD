export const schema = gql`
  type Internal {
    id: Int!
    createdAt: DateTime!
    name: String!
  }

  type Query {
    internals: [Internal!]!
    internal(id: Int!): Internal
  }

  input CreateInternalInput {
    name: String!
  }

  input UpdateInternalInput {
    name: String
  }

  type Mutation {
    createInternal(input: CreateInternalInput!): Internal!
    updateInternal(id: Int!, input: UpdateInternalInput!): Internal!
    deleteInternal(id: Int!): Internal!
  }
`
