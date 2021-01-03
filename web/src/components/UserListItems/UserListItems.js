import { useMutation, useFlash } from '@redwoodjs/web';
import { Link, routes } from '@redwoodjs/router';

import { QUERY } from 'src/components/UserListItemsCell';

const DELETE_USER_LIST_ITEM_MUTATION = gql`
  mutation DeleteUserListItemMutation($id: Int!) {
    deleteUserListItem(id: $id) {
      id
    }
  }
`;

const MAX_STRING_LENGTH = 150;

const truncate = text => {
  let output = text;
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...';
  }
  return output;
};

const jsonTruncate = obj => {
  return truncate(JSON.stringify(obj, null, 2));
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

const UserListItemsList = ({ userListItems }) => {
  const { addMessage } = useFlash();
  const [deleteUserListItem] = useMutation(DELETE_USER_LIST_ITEM_MUTATION, {
    onCompleted: () => {
      addMessage('UserListItem deleted.', { classes: 'rw-flash-success' });
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  });

  const onDeleteClick = id => {
    if (confirm('Are you sure you want to delete userListItem ' + id + '?')) {
      deleteUserListItem({ variables: { id } });
    }
  };

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>User identifier</th>
            <th>List item id</th>
            <th>Status</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {userListItems.map(userListItem => (
            <tr key={userListItem.id}>
              <td>{truncate(userListItem.id)}</td>
              <td>{truncate(userListItem.userIdentifier)}</td>
              <td>{truncate(userListItem.listItemId)}</td>
              <td>{truncate(userListItem.status)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.userListItem({ id: userListItem.id })}
                    title={'Show userListItem ' + userListItem.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editUserListItem({ id: userListItem.id })}
                    title={'Edit userListItem ' + userListItem.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete userListItem ' + userListItem.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(userListItem.id)}
                  >
                    Delete
                  </a>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserListItemsList;
