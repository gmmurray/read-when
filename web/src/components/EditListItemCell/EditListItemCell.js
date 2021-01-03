import { useMutation, useFlash } from '@redwoodjs/web';
import { navigate, routes } from '@redwoodjs/router';
import ListItemForm from 'src/components/ListItemForm';

export const QUERY = gql`
  query FIND_LIST_ITEM_BY_ID($id: Int!) {
    listItem: listItem(id: $id) {
      id
      listId
      isbn
      ordinal
    }
  }
`;
const UPDATE_LIST_ITEM_MUTATION = gql`
  mutation UpdateListItemMutation($id: Int!, $input: UpdateListItemInput!) {
    updateListItem(id: $id, input: $input) {
      id
      listId
      isbn
      ordinal
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Success = ({ listItem }) => {
  const { addMessage } = useFlash();
  const [updateListItem, { loading, error }] = useMutation(
    UPDATE_LIST_ITEM_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.listItems());
        addMessage('ListItem updated.', { classes: 'rw-flash-success' });
      },
    },
  );

  const onSave = (input, id) => {
    const castInput = Object.assign(input, { listId: parseInt(input.listId) });
    updateListItem({ variables: { id, input: castInput } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit ListItem {listItem.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ListItemForm
          listItem={listItem}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  );
};
