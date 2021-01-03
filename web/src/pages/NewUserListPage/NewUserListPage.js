import UserListsLayout from 'src/layouts/UserListsLayout';
import NewUserList from 'src/components/NewUserList';

const NewUserListPage = () => {
  return (
    <UserListsLayout>
      <NewUserList />
    </UserListsLayout>
  );
};

export default NewUserListPage;
