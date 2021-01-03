import { useMutation, useFlash } from '@redwoodjs/web';
import { Link, routes, navigate } from '@redwoodjs/router';

import { QUERY } from 'src/components/ListItemsCell';

const DELETE_LIST_ITEM_MUTATION = gql`
  mutation DeleteListItemMutation($id: Int!) {
    deleteListItem(id: $id) {
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

const ListItem = ({ listItem }) => {
  const { addMessage } = useFlash();
  const [deleteListItem] = useMutation(DELETE_LIST_ITEM_MUTATION, {
    onCompleted: () => {
      navigate(routes.listItems());
      addMessage('ListItem deleted.', { classes: 'rw-flash-success' });
    },
  });

  const onDeleteClick = id => {
    if (confirm('Are you sure you want to delete listItem ' + id + '?')) {
      deleteListItem({ variables: { id } });
    }
  };

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            ListItem {listItem.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{listItem.id}</td>
            </tr>
            <tr>
              <th>List id</th>
              <td>{listItem.listId}</td>
            </tr>
            <tr>
              <th>Isbn</th>
              <td>{listItem.isbn}</td>
            </tr>
            <tr>
              <th>Ordinal</th>
              <td>{listItem.ordinal}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editListItem({ id: listItem.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(listItem.id)}
        >
          Delete
        </a>
      </nav>
    </>
  );
};

export default ListItem;
