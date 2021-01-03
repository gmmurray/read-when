import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  TextField,
  Submit,
} from '@redwoodjs/forms';

const ListItemForm = props => {
  const onSubmit = data => {
    props.onSave(data, props?.listItem?.id);
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
          defaultValue={props.listItem?.listId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="listId" className="rw-field-error" />

        <Label
          name="isbn"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Isbn
        </Label>
        <TextField
          name="isbn"
          defaultValue={props.listItem?.isbn}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="isbn" className="rw-field-error" />

        <Label
          name="ordinal"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Ordinal
        </Label>
        <NumberField
          name="ordinal"
          defaultValue={props.listItem?.ordinal}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="ordinal" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  );
};

export default ListItemForm;
