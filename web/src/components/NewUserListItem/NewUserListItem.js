import { useMutation, useFlash } from '@redwoodjs/web';
import { navigate, routes } from '@redwoodjs/router';
import UserListItemForm from 'src/components/UserListItemForm';

import { QUERY } from 'src/components/UserListItemsCell';

const CREATE_USER_LIST_ITEM_MUTATION = gql`
  mutation CreateUserListItemMutation($input: CreateUserListItemInput!) {
    createUserListItem(input: $input) {
      id
    }
  }
`;

const NewUserListItem = () => {
  const { addMessage } = useFlash();
  const [createUserListItem, { loading, error }] = useMutation(
    CREATE_USER_LIST_ITEM_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.userListItems());
        addMessage('UserListItem created.', { classes: 'rw-flash-success' });
      },
    },
  );

  const onSave = input => {
    const castInput = Object.assign(input, {
      listItemId: parseInt(input.listItemId),
    });
    createUserListItem({ variables: { input: castInput } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New UserListItem</h2>
      </header>
      <div className="rw-segment-main">
        <UserListItemForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default NewUserListItem;
