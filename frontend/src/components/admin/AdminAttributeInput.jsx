import React from "react";

const AdminAttributeInput = ({
  attribute,
  handleChange,
  index,
  handleDelete,
}) => {
  return (
    <div className="row m-0 w-100 p-0">
      <div className="col-sm-12 col-md-5 p-0 border">
        <div className="text-left text-bold mx-auto my-auto p-3">
          <input
            value={attribute.name}
            onChange={(e) => handleChange(e.target.value, index, "name")}
            className="w-100 p-1 rounded disabled"
          />
          {attribute.error && (
            <small className="form-text text-danger">
              {attribute.error[0]}
            </small>
          )}
        </div>
      </div>
      <div className="col-sm-12 col-md-5 p-0 border text-center">
        <div className="text-left text-bold mx-auto my-auto p-3">
          <input
            value={attribute.value}
            onChange={(e) => handleChange(e.target.value, index, "value")}
            className="w-100 p-1 rounded disabled"
          />
          {attribute.error && (
            <small className="form-text text-danger">
              {attribute.error[1]}
            </small>
          )}
        </div>
      </div>
      <div className="col-sm-12 col-md-1 p-0 border text-center">
        <div className="text-center text-bold mx-auto my-auto">
          <div className="p-2 mx-auto w-40px bg-darkgray mt-3 mb-sm-3">
            <input
              checked={attribute.important}
              onChange={(e) =>
                handleChange(!attribute.important, index, "important")
              }
              type="checkbox"
              className="w-100 p-1 rounded disabled"
            />
          </div>
        </div>
      </div>
      <div className="col p-0 border">
        <button
          onClick={() => handleDelete(index)}
          className="font bg-danger w-75 text-white text-center rounded p-1 border-0 d-block mx-auto mt-3 mb-sm-3">
          Obriši
        </button>
      </div>
    </div>
  );
};

export default AdminAttributeInput;
