import { useMutation, useFlash } from '@redwoodjs/web';
import { Link, routes, navigate } from '@redwoodjs/router';

import { QUERY } from 'src/components/UserListItemsCell';

const DELETE_USER_LIST_ITEM_MUTATION = gql`
  mutation DeleteUserListItemMutation($id: Int!) {
    deleteUserListItem(id: $id) {
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

const UserListItem = ({ userListItem }) => {
  const { addMessage } = useFlash();
  const [deleteUserListItem] = useMutation(DELETE_USER_LIST_ITEM_MUTATION, {
    onCompleted: () => {
      navigate(routes.userListItems());
      addMessage('UserListItem deleted.', { classes: 'rw-flash-success' });
    },
  });

  const onDeleteClick = id => {
    if (confirm('Are you sure you want to delete userListItem ' + id + '?')) {
      deleteUserListItem({ variables: { id } });
    }
  };

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            UserListItem {userListItem.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{userListItem.id}</td>
            </tr>
            <tr>
              <th>User identifier</th>
              <td>{userListItem.userIdentifier}</td>
            </tr>
            <tr>
              <th>List item id</th>
              <td>{userListItem.listItemId}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{userListItem.status}</td>
            </tr>
            <tr>
              <th>Owned</th>
              <td>{checkboxInputTag(userListItem.owned)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editUserListItem({ id: userListItem.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(userListItem.id)}
        >
          Delete
        </a>
      </nav>
    </>
  );
};

export default UserListItem;
