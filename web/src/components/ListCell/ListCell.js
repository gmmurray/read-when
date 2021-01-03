import List from 'src/components/List';

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

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>List not found</div>;

export const Success = ({ list }) => {
  return <List list={list} />;
};
