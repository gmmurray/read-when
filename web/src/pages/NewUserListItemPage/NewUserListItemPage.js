import UserListItemsLayout from 'src/layouts/UserListItemsLayout';
import NewUserListItem from 'src/components/NewUserListItem';

const NewUserListItemPage = () => {
  return (
    <UserListItemsLayout>
      <NewUserListItem />
    </UserListItemsLayout>
  );
};

export default NewUserListItemPage;
