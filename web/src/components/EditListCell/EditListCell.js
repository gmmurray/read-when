import { useMutation, useFlash } from '@redwoodjs/web';
import { navigate, routes } from '@redwoodjs/router';
import ListForm from 'src/components/ListForm';

export const QUERY = gql`
  query FIND_LIST_BY_ID($id: Int!) {
    list: list(id: $id) {
      id
      isPublic
      title
      description
      category
      ownerIdentifier
      createdAt
      updatedAt
    }
  }
`;
const UPDATE_LIST_MUTATION = gql`
  mutation UpdateListMutation($id: Int!, $input: UpdateListInput!) {
    updateList(id: $id, input: $input) {
      id
      isPublic
      title
      description
      category
      ownerIdentifier
      createdAt
      updatedAt
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Success = ({ list }) => {
  const { addMessage } = useFlash();
  const [updateList, { loading, error }] = useMutation(UPDATE_LIST_MUTATION, {
    onCompleted: () => {
      navigate(routes.lists());
      addMessage('List updated.', { classes: 'rw-flash-success' });
    },
  });

  const onSave = (input, id) => {
    updateList({ variables: { id, input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit List {list.id}</h2>
      </header>
      <div className="rw-segment-main">
        <ListForm list={list} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  );
};
