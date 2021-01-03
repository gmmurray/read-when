import { Link, routes } from '@redwoodjs/router';

import UserListItems from 'src/components/UserListItems';

export const QUERY = gql`
  query USER_LIST_ITEMS {
    userListItems {
      id
      userIdentifier
      listItemId
      status
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No userListItems yet. '}
      <Link to={routes.newUserListItem()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  );
};

export const Success = ({ userListItems }) => {
  return <UserListItems userListItems={userListItems} />;
};
