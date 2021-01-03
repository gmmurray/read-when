import { useMutation, useFlash } from '@redwoodjs/web';
import { Link, routes, navigate } from '@redwoodjs/router';

import { QUERY } from 'src/components/ListsCell';

const DELETE_LIST_MUTATION = gql`
  mutation DeleteListMutation($id: Int!) {
    deleteList(id: $id) {
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

const List = ({ list }) => {
  const { addMessage } = useFlash();
  const [deleteList] = useMutation(DELETE_LIST_MUTATION, {
    onCompleted: () => {
      navigate(routes.lists());
      addMessage('List deleted.', { classes: 'rw-flash-success' });
    },
  });

  const onDeleteClick = id => {
    if (confirm('Are you sure you want to delete list ' + id + '?')) {
      deleteList({ variables: { id } });
    }
  };

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            List {list.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{list.id}</td>
            </tr>
            <tr>
              <th>Is public</th>
              <td>{checkboxInputTag(list.isPublic)}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{list.title}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{list.description}</td>
            </tr>
            <tr>
              <th>Category</th>
              <td>{list.category}</td>
            </tr>
            <tr>
              <th>Owner identifier</th>
              <td>{list.ownerIdentifier}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(list.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(list.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editList({ id: list.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(list.id)}
        >
          Delete
        </a>
      </nav>
    </>
  );
};

export default List;
