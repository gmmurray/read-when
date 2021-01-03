import { useMutation, useFlash } from '@redwoodjs/web';
import { Link, routes, navigate } from '@redwoodjs/router';

import { QUERY } from 'src/components/UserListsCell';

const DELETE_USER_LIST_MUTATION = gql`
  mutation DeleteUserListMutation($id: Int!) {
    deleteUserList(id: $id) {
      id
    }
  }
`;

const jsonDisplay = obj => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  );
};

const timeTag = datetime => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  );
};

const checkboxInputTag = checked => {
  return <input type="checkbox" checked={checked} disabled />;
};

const UserList = ({ userList }) => {
  const { addMessage } = useFlash();
  const [deleteUserList] = useMutation(DELETE_USER_LIST_MUTATION, {
    onCompleted: () => {
      navigate(routes.userLists());
      addMessage('UserList deleted.', { classes: 'rw-flash-success' });
    },
  });

  const onDeleteClick = id => {
    if (confirm('Are you sure you want to delete userList ' + id + '?')) {
      deleteUserList({ variables: { id } });
    }
  };

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            UserList {userList.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{userList.id}</td>
            </tr>
            <tr>
              <th>List id</th>
              <td>{userList.listId}</td>
            </tr>
            <tr>
              <th>User identifier</th>
              <td>{userList.userIdentifier}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editUserList({ id: userList.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(userList.id)}
        >
          Delete
        </a>
      </nav>
    </>
  );
};

export default UserList;
