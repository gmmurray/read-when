export const schema = gql`
  type ListItem {
    id: Int!
    listId: Int!
    isbn: String!
    ordinal: Int!
    list: List!
    userListItems: [UserListItem]!
  }

  type Query {
    listItems: [ListItem!]!
    listItem(id: Int!): ListItem
  }

  input CreateListItemInput {
    listId: Int!
    isbn: String!
    ordinal: Int!
  }

  input UpdateListItemInput {
    listId: Int
    isbn: String
    ordinal: Int
  }

  type Mutation {
    createListItem(input: CreateListItemInput!): ListItem!
    updateListItem(id: Int!, input: UpdateListItemInput!): ListItem!
    deleteListItem(id: Int!): ListItem!
  }
`;
