import React from "react";

const AdminInput = ({
  attributeName,
  value,
  handleChange,
  type = "text",
  min,
  name,
  error,
}) => {
  return (
    <div className="row m-0 w-100 py-2 border-bottom">
      <div className="col-md-6 col-sm-12">
        <input className="w-100 p-1 rounded disabled" value={name} disabled />
      </div>
      <div className="col-md-6 col-sm-12">
        <input
          value={value}
          onChange={(e) => handleChange(e.target.value, attributeName)}
          className="w-100 rounded p-1"
          type={type}
          min={min}
        />
        {error && value === "" && (
          <small className="form-text text-danger">{error}</small>
        )}
      </div>
    </div>
  );
};

export default AdminInput;
