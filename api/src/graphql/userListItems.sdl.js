export const schema = gql`
  type UserListItem {
    id: Int!
    userIdentifier: String!
    listItemId: Int!
    userListId: Int!
    status: ReadingStatus!
    owned: Boolean!
    listItem: ListItem!
    userList: UserList!
  }

  enum ReadingStatus {
    NOT_STARTED
    IN_PROGRESS
    COMPLETED
  }

  type Query {
    userListItems: [UserListItem!]!
    userListItems(listId: Int): [UserListItem!]!
    userListItem(id: Int!): UserListItem
  }

  input CreateUserListItemInput {
    userIdentifier: String!
    listItemId: Int!
    userListId: Int!
    status: ReadingStatus
    owned: Boolean
  }

  input UpdateUserListItemInput {
    userIdentifier: String
    listItemId: Int
    userListId: Int
    status: ReadingStatus
    owned: Boolean
  }

  type Mutation {
    createUserListItem(input: CreateUserListItemInput!): UserListItem!
    updateUserListItem(id: Int!, input: UpdateUserListItemInput!): UserListItem!
    deleteUserListItem(id: Int!): UserListItem!
  }
`;
