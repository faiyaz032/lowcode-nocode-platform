import React from 'react';
import Input from '../input/input.component';
import './crudForm.styles.css';

const CrudForm = ({ setValue, value, i, deleteCrudForm }) => {
  return (
    <div data-indx={i}>
      <div className="block-top">
        <h2 className="form-block-title">Input Field {i + 1}:</h2>
        <button type="button" onClick={deleteCrudForm} className="btn-delete-blk">
          Delete Block
        </button>
      </div>
      <div className="form-block">
        <Input
          indx={i}
          name="type"
          label="Enter Type of Input"
          required
          setValue={setValue}
          value={value}
        />
        <Input
          indx={i}
          name="label"
          label="Enter Label For Input"
          required
          setValue={setValue}
          value={value}
        />
        <Input
          indx={i}
          name="placeholder"
          label="Enter Placeholder for Input"
          required
          setValue={setValue}
          value={value}
        />
        <Input
          indx={i}
          name="name"
          label="Enter Name of Input"
          required
          setValue={setValue}
          value={value}
        />
      </div>
    </div>
  );
};

export default CrudForm;
