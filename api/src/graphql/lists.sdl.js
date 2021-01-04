export const schema = gql`
  type List {
    id: Int!
    isPublic: Boolean!
    title: String!
    description: String!
    category: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    userLists: [UserList]!
    listItems: [ListItem]!
  }

  type Query {
    lists: [List!]!
    list(id: Int!): List
  }

  input CreateListInput {
    isPublic: Boolean!
    title: String!
    description: String!
    category: String!
  }

  input UpdateListInput {
    isPublic: Boolean
    title: String
    description: String
    category: String
  }

  type Mutation {
    createList(input: CreateListInput!): List!
    updateList(id: Int!, input: UpdateListInput!): List!
    deleteList(id: Int!): List!
  }
`;
