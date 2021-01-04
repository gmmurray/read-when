export const schema = gql`
  type UserList {
    id: Int!
    listId: Int!
    userIdentifier: String!
    list: List!
    userListItems: [UserListItem]!
  }

  type Query {
    userLists: [UserList!]!
    userLists(listId: Int): [UserList!]!
    userList(id: Int!): UserList
  }

  input CreateUserListInput {
    listId: Int!
    userIdentifier: String!
  }

  input UpdateUserListInput {
    listId: Int
    userIdentifier: String
  }

  type Mutation {
    createUserList(input: CreateUserListInput!): UserList!
    updateUserList(id: Int!, input: UpdateUserListInput!): UserList!
    deleteUserList(id: Int!): UserList!
  }
`;
