import UserList from 'src/components/UserList';

export const QUERY = gql`
  query FIND_USER_LIST_BY_ID($id: Int!) {
    userList: userList(id: $id) {
      id
      listId
      userIdentifier
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>UserList not found</div>;

export const Success = ({ userList }) => {
  return <UserList userList={userList} />;
};
