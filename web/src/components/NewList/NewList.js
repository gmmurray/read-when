import { useMutation, useFlash } from '@redwoodjs/web';
import { navigate, routes } from '@redwoodjs/router';
import ListForm from 'src/components/ListForm';

import { QUERY } from 'src/components/ListsCell';

const CREATE_LIST_MUTATION = gql`
  mutation CreateListMutation($input: CreateListInput!) {
    createList(input: $input) {
      id
    }
  }
`;

const NewList = () => {
  const { addMessage } = useFlash();
  const [createList, { loading, error }] = useMutation(CREATE_LIST_MUTATION, {
    onCompleted: () => {
      navigate(routes.lists());
      addMessage('List created.', { classes: 'rw-flash-success' });
    },
  });

  const onSave = input => {
    createList({ variables: { input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New List</h2>
      </header>
      <div className="rw-segment-main">
        <ListForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default NewList;
