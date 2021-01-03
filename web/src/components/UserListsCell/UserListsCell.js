import { Link, routes } from '@redwoodjs/router';

import UserLists from 'src/components/UserLists';

export const QUERY = gql`
  query USER_LISTS {
    userLists {
      id
      listId
      userIdentifier
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No userLists yet. '}
      <Link to={routes.newUserList()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  );
};

export const Success = ({ userLists }) => {
  return <UserLists userLists={userLists} />;
};
