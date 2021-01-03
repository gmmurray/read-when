import ListItemsLayout from 'src/layouts/ListItemsLayout';
import ListItemCell from 'src/components/ListItemCell';

const ListItemPage = ({ id }) => {
  return (
    <ListItemsLayout>
      <ListItemCell id={id} />
    </ListItemsLayout>
  );
};

export default ListItemPage;
