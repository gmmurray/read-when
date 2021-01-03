import ListItem from 'src/components/ListItem';

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

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>ListItem not found</div>;

export const Success = ({ listItem }) => {
  return <ListItem listItem={listItem} />;
};
