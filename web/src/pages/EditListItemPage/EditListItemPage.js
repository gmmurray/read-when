import ListItemsLayout from 'src/layouts/ListItemsLayout';
import EditListItemCell from 'src/components/EditListItemCell';

const EditListItemPage = ({ id }) => {
  return (
    <ListItemsLayout>
      <EditListItemCell id={id} />
    </ListItemsLayout>
  );
};

export default EditListItemPage;
