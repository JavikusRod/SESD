export const schema = gql`
  type External {
    id: Int!
    createdAt: DateTime!
    name: String!
  }

  type Query {
    externals: [External!]!
    external(id: Int!): External
  }

  input CreateExternalInput {
    name: String!
  }

  input UpdateExternalInput {
    name: String
  }

  type Mutation {
    createExternal(input: CreateExternalInput!): External!
    updateExternal(id: Int!, input: UpdateExternalInput!): External!
    deleteExternal(id: Int!): External!
  }
`
