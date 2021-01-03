import UserListItemsLayout from 'src/layouts/UserListItemsLayout';
import EditUserListItemCell from 'src/components/EditUserListItemCell';

const EditUserListItemPage = ({ id }) => {
  return (
    <UserListItemsLayout>
      <EditUserListItemCell id={id} />
    </UserListItemsLayout>
  );
};

export default EditUserListItemPage;
