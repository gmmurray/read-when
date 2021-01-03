import { useMutation, useFlash } from '@redwoodjs/web';
import { navigate, routes } from '@redwoodjs/router';
import UserListForm from 'src/components/UserListForm';

export const QUERY = gql`
  query FIND_USER_LIST_BY_ID($id: Int!) {
    userList: userList(id: $id) {
      id
      listId
      userIdentifier
    }
  }
`;
const UPDATE_USER_LIST_MUTATION = gql`
  mutation UpdateUserListMutation($id: Int!, $input: UpdateUserListInput!) {
    updateUserList(id: $id, input: $input) {
      id
      listId
      userIdentifier
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Success = ({ userList }) => {
  const { addMessage } = useFlash();
  const [updateUserList, { loading, error }] = useMutation(
    UPDATE_USER_LIST_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.userLists());
        addMessage('UserList updated.', { classes: 'rw-flash-success' });
      },
    },
  );

  const onSave = (input, id) => {
    const castInput = Object.assign(input, { listId: parseInt(input.listId) });
    updateUserList({ variables: { id, input: castInput } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit UserList {userList.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <UserListForm
          userList={userList}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  );
};
