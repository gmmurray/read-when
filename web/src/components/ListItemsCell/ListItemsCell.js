import { Link, routes } from '@redwoodjs/router';

import ListItems from 'src/components/ListItems';

export const QUERY = gql`
  query LIST_ITEMS {
    listItems {
      id
      listId
      isbn
      ordinal
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No listItems yet. '}
      <Link to={routes.newListItem()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  );
};

export const Success = ({ listItems }) => {
  return <ListItems listItems={listItems} />;
};
