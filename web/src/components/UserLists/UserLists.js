import { useMutation, useFlash } from '@redwoodjs/web';
import { Link, routes } from '@redwoodjs/router';

import { QUERY } from 'src/components/UserListsCell';

const DELETE_USER_LIST_MUTATION = gql`
  mutation DeleteUserListMutation($id: Int!) {
    deleteUserList(id: $id) {
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

const UserListsList = ({ userLists }) => {
  const { addMessage } = useFlash();
  const [deleteUserList] = useMutation(DELETE_USER_LIST_MUTATION, {
    onCompleted: () => {
      addMessage('UserList deleted.', { classes: 'rw-flash-success' });
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  });

  const onDeleteClick = id => {
    if (confirm('Are you sure you want to delete userList ' + id + '?')) {
      deleteUserList({ variables: { id } });
    }
  };

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>List id</th>
            <th>User identifier</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {userLists.map(userList => (
            <tr key={userList.id}>
              <td>{truncate(userList.id)}</td>
              <td>{truncate(userList.listId)}</td>
              <td>{truncate(userList.userIdentifier)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.userList({ id: userList.id })}
                    title={'Show userList ' + userList.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editUserList({ id: userList.id })}
                    title={'Edit userList ' + userList.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete userList ' + userList.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(userList.id)}
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

export default UserListsList;
