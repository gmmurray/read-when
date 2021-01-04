export const schema = gql`
  type ListOwner {
    ownerIdentifier: String!
    listId: Int!
    list: List!
  }

  type Query {
    listOwners: [ListOwner!]!
    listOwner(listId: Int!, ownerIdentifier: String!): ListOwner
  }

  input CreateListOwnerInput {
    ownerIdentifier: String!
    listId: Int!
  }

  input UpdateListOwnerInput {
    ownerIdentifier: String
    listId: Int
  }

  type Mutation {
    createListOwner(input: CreateListOwnerInput!): ListOwner!
    updateListOwner(listId: Int!, input: UpdateUserListInput!): ListOwner!
    deleteListOwner(listId: Int!, ownerIdentifier: String!): ListOwner!
  }
`;
