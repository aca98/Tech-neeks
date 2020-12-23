import React from "react";

const CheckboxInput = ({ type, inputName, inputCount, handleChange }) => {
  return (
    <div className="row row-cols-2">
      <div className="col-1">
        <input
          onChange={() => handleChange(type, inputName)}
          type="checkbox"
          className="d-inline-block"
          id="exampleCheck1"
        />
      </div>
      <div className="col-10">
        <label
          className="d-inline-block text-small text-bold"
          htmlFor="exampleCheck1">
          {inputName} ({inputCount})
        </label>
      </div>
    </div>
  );
};

export default CheckboxInput;
