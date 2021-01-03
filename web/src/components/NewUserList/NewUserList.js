import { useMutation, useFlash } from '@redwoodjs/web';
import { navigate, routes } from '@redwoodjs/router';
import UserListForm from 'src/components/UserListForm';

import { QUERY } from 'src/components/UserListsCell';

const CREATE_USER_LIST_MUTATION = gql`
  mutation CreateUserListMutation($input: CreateUserListInput!) {
    createUserList(input: $input) {
      id
    }
  }
`;

const NewUserList = () => {
  const { addMessage } = useFlash();
  const [createUserList, { loading, error }] = useMutation(
    CREATE_USER_LIST_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.userLists());
        addMessage('UserList created.', { classes: 'rw-flash-success' });
      },
    },
  );

  const onSave = input => {
    const castInput = Object.assign(input, { listId: parseInt(input.listId) });
    createUserList({ variables: { input: castInput } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New UserList</h2>
      </header>
      <div className="rw-segment-main">
        <UserListForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default NewUserList;
