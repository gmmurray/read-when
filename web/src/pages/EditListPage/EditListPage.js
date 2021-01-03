import ListsLayout from 'src/layouts/ListsLayout';
import EditListCell from 'src/components/EditListCell';

const EditListPage = ({ id }) => {
  return (
    <ListsLayout>
      <EditListCell id={id} />
    </ListsLayout>
  );
};

export default EditListPage;
