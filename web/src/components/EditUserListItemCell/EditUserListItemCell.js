import { useMutation, useFlash } from '@redwoodjs/web';
import { navigate, routes } from '@redwoodjs/router';
import UserListItemForm from 'src/components/UserListItemForm';

export const QUERY = gql`
  query FIND_USER_LIST_ITEM_BY_ID($id: Int!) {
    userListItem: userListItem(id: $id) {
      id
      userIdentifier
      listItemId
      status
      userListId
      owned
    }
  }
`;
const UPDATE_USER_LIST_ITEM_MUTATION = gql`
  mutation UpdateUserListItemMutation(
    $id: Int!
    $input: UpdateUserListItemInput!
  ) {
    updateUserListItem(id: $id, input: $input) {
      id
      userIdentifier
      listItemId
      status
      userListId
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Success = ({ userListItem }) => {
  const { addMessage } = useFlash();
  const [updateUserListItem, { loading, error }] = useMutation(
    UPDATE_USER_LIST_ITEM_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.userListItems());
        addMessage('UserListItem updated.', { classes: 'rw-flash-success' });
      },
    },
  );

  const onSave = (input, id) => {
    const castInput = Object.assign(input, {
      listItemId: parseInt(input.listItemId),
    });
    updateUserListItem({ variables: { id, input: castInput } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit UserListItem {userListItem.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <UserListItemForm
          userListItem={userListItem}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  );
};
