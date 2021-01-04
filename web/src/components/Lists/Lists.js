import { useMutation, useFlash } from '@redwoodjs/web';
import { Link, routes } from '@redwoodjs/router';

import { QUERY } from 'src/components/ListsCell';

const DELETE_LIST_MUTATION = gql`
  mutation DeleteListMutation($id: Int!) {
    deleteList(id: $id) {
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

const ListsList = ({ lists }) => {
  const { addMessage } = useFlash();
  const [deleteList] = useMutation(DELETE_LIST_MUTATION, {
    onCompleted: () => {
      addMessage('List deleted.', { classes: 'rw-flash-success' });
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  });

  const onDeleteClick = id => {
    if (confirm('Are you sure you want to delete list ' + id + '?')) {
      deleteList({ variables: { id } });
    }
  };

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Is public</th>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Owner identifier</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {lists.map(list => (
            <tr key={list.id}>
              <td>{truncate(list.id)}</td>
              <td>{checkboxInputTag(list.isPublic)}</td>
              <td>{truncate(list.title)}</td>
              <td>{truncate(list.description)}</td>
              <td>{truncate(list.category)}</td>
              <td>{timeTag(list.createdAt)}</td>
              <td>{timeTag(list.updatedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.list({ id: list.id })}
                    title={'Show list ' + list.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editList({ id: list.id })}
                    title={'Edit list ' + list.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete list ' + list.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(list.id)}
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

export default ListsList;
