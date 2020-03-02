import React from 'react';
import PropTypes from 'prop-types';
import { useFormApi } from '@data-driven-forms/react-form-renderer';

const SubForm = ({ fields, title, description, FormSpyProvider: _FormSpyProvider, validate: _validate, ...rest }) => {
  const formOptions = useFormApi();
  return (
    <div {...rest}>
      {title && <h3>{title}</h3>}
      {description && <p>{description}</p>}
      {formOptions.renderForm(fields, formOptions)}
    </div>
  );
};

SubForm.propTypes = {
  fields: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  FormSpyProvider: PropTypes.any,
  validate: PropTypes.any
};

export default SubForm;
