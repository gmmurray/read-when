import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  TextField,
  Submit,
} from '@redwoodjs/forms';

const UserListForm = props => {
  const onSubmit = data => {
    props.onSave(data, props?.userList?.id);
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
          name="listId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          List id
        </Label>
        <NumberField
          name="listId"
          defaultValue={props.userList?.listId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="listId" className="rw-field-error" />

        <Label
          name="userIdentifier"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User identifier
        </Label>
        <TextField
          name="userIdentifier"
          defaultValue={props.userList?.userIdentifier}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="userIdentifier" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  );
};

export default UserListForm;
