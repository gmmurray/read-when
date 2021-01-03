import { useMutation, useFlash } from '@redwoodjs/web';
import { Link, routes } from '@redwoodjs/router';

import { QUERY } from 'src/components/ListItemsCell';

const DELETE_LIST_ITEM_MUTATION = gql`
  mutation DeleteListItemMutation($id: Int!) {
    deleteListItem(id: $id) {
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

const ListItemsList = ({ listItems }) => {
  const { addMessage } = useFlash();
  const [deleteListItem] = useMutation(DELETE_LIST_ITEM_MUTATION, {
    onCompleted: () => {
      addMessage('ListItem deleted.', { classes: 'rw-flash-success' });
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  });

  const onDeleteClick = id => {
    if (confirm('Are you sure you want to delete listItem ' + id + '?')) {
      deleteListItem({ variables: { id } });
    }
  };

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>List id</th>
            <th>Isbn</th>
            <th>Ordinal</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {listItems.map(listItem => (
            <tr key={listItem.id}>
              <td>{truncate(listItem.id)}</td>
              <td>{truncate(listItem.listId)}</td>
              <td>{truncate(listItem.isbn)}</td>
              <td>{truncate(listItem.ordinal)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.listItem({ id: listItem.id })}
                    title={'Show listItem ' + listItem.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editListItem({ id: listItem.id })}
                    title={'Edit listItem ' + listItem.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete listItem ' + listItem.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(listItem.id)}
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

export default ListItemsList;
