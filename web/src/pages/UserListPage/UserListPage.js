import UserListsLayout from 'src/layouts/UserListsLayout';
import UserListCell from 'src/components/UserListCell';

const UserListPage = ({ id }) => {
  return (
    <UserListsLayout>
      <UserListCell id={id} />
    </UserListsLayout>
  );
};

export default UserListPage;
