import React from "react";

const UseProfile = ({
  name,
  attribute,
  handleChange,
  value,
  type = "text",
  error,
}) => {
  return (
    <React.Fragment>
      <div className="col-sm-12 col-md-4 border-bottom">
        <p className="text-sm-left text-md-right ">{name}</p>
      </div>
      <div className="col-sm-12 col-md-8  border-bottom">
        <React.Fragment>
          <input
            className={`${error === true && value === "" && "border-danger"}`}
            type={type}
            onClick={(e) => handleChange(e.target.value, attribute)}
            value={value}
          />
          {error && (
            <small id="emailHelp" className="form-text text-danger">
              {error}
            </small>
          )}
        </React.Fragment>
      </div>
    </React.Fragment>
  );
};

export default UseProfile;
