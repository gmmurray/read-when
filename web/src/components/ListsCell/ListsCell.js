import { Link, routes } from '@redwoodjs/router';

import Lists from 'src/components/Lists';

export const QUERY = gql`
  query LISTS {
    lists {
      id
      isPublic
      title
      description
      category
      createdAt
      updatedAt
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No lists yet. '}
      <Link to={routes.newList()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  );
};

export const Success = ({ lists }) => {
  return <Lists lists={lists} />;
};
