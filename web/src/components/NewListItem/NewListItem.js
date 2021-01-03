import { useMutation, useFlash } from '@redwoodjs/web';
import { navigate, routes } from '@redwoodjs/router';
import ListItemForm from 'src/components/ListItemForm';

import { QUERY } from 'src/components/ListItemsCell';

const CREATE_LIST_ITEM_MUTATION = gql`
  mutation CreateListItemMutation($input: CreateListItemInput!) {
    createListItem(input: $input) {
      id
    }
  }
`;

const NewListItem = () => {
  const { addMessage } = useFlash();
  const [createListItem, { loading, error }] = useMutation(
    CREATE_LIST_ITEM_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.listItems());
        addMessage('ListItem created.', { classes: 'rw-flash-success' });
      },
    },
  );

  const onSave = input => {
    const castInput = Object.assign(input, { listId: parseInt(input.listId) });
    createListItem({ variables: { input: castInput } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New ListItem</h2>
      </header>
      <div className="rw-segment-main">
        <ListItemForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default NewListItem;
