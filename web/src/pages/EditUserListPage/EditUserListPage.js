import UserListsLayout from 'src/layouts/UserListsLayout';
import EditUserListCell from 'src/components/EditUserListCell';

const EditUserListPage = ({ id }) => {
  return (
    <UserListsLayout>
      <EditUserListCell id={id} />
    </UserListsLayout>
  );
};

export default EditUserListPage;
