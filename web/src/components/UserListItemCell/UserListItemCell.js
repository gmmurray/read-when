import UserListItem from 'src/components/UserListItem';

export const QUERY = gql`
  query FIND_USER_LIST_ITEM_BY_ID($id: Int!) {
    userListItem: userListItem(id: $id) {
      id
      userIdentifier
      listItemId
      status
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>UserListItem not found</div>;

export const Success = ({ userListItem }) => {
  return <UserListItem userListItem={userListItem} />;
};
