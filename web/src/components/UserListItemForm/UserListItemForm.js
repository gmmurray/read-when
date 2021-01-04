import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  CheckboxField,
  Submit,
  SelectField,
} from '@redwoodjs/forms';
import { statusOptions } from 'src/shared/constants/userListItemStatus';

const UserListItemForm = props => {
  const onSubmit = data => {
    props.onSave(data, props?.userListItem?.id);
  };

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="userIdentifier"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User identifier
        </Label>
        <TextField
          name="userIdentifier"
          defaultValue={props.userListItem?.userIdentifier}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="userIdentifier" className="rw-field-error" />

        <Label
          name="listItemId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          List item id
        </Label>
        <NumberField
          name="listItemId"
          defaultValue={props.userListItem?.listItemId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="listItemId" className="rw-field-error" />

        <Label
          name="userListId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User List Id
        </Label>
        <NumberField
          name="userListId"
          defaultValue={props.userListItem?.userListId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="userListId" className="rw-field-error" />

        <Label
          name="status"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Status
        </Label>
        <SelectField
          name="status"
          defaultValue={props.userListItem?.status}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
          options={statusOptions}
        >
          <option value="">Please select</option>
          <option value={statusOptions.notStarted.value}>
            {statusOptions.notStarted.name}
          </option>
          <option value={statusOptions.inProgress.value}>
            {statusOptions.inProgress.name}
          </option>
          <option value={statusOptions.completed.value}>
            {statusOptions.completed.name}
          </option>
        </SelectField>
        <FieldError name="status" className="rw-field-error" />

        <Label
          name="owned"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Owned
        </Label>
        <CheckboxField
          name="owned"
          defaultChecked={props.userListItem?.owned}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="owned" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  );
};

export default UserListItemForm;
