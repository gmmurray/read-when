import ListsLayout from 'src/layouts/ListsLayout';
import ListCell from 'src/components/ListCell';

const ListPage = ({ id }) => {
  return (
    <ListsLayout>
      <ListCell id={id} />
    </ListsLayout>
  );
};

export default ListPage;
