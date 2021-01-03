import UserListItemsLayout from 'src/layouts/UserListItemsLayout';
import UserListItemCell from 'src/components/UserListItemCell';

const UserListItemPage = ({ id }) => {
  return (
    <UserListItemsLayout>
      <UserListItemCell id={id} />
    </UserListItemsLayout>
  );
};

export default UserListItemPage;
