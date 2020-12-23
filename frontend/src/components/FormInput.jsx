import React from "react";
import errorMessages from "../utills/errorMessages";

const FormInput = ({
  name,
  attribute,
  handleChange,
  value,
  multipleChoice,
  type = "text",
  disable = false,
  error,
}) => {
  return (
    <React.Fragment>
      <div className={`col-sm-12 col-md-4 `}>
        <p className="text-sm-left text-md-right ">{name}</p>
      </div>
      <div className={`col-sm-12 col-md-8  `}>
        {multipleChoice ? (
          <div className={`row `}>
            <div className="form-check col-sm-12 col-md-6">
              <input
                type="radio"
                name="exampleRadios"
                id="exampleRadios1"
                value="Muški"
                onClick={(e) => handleChange(e.target.value, attribute)}
                checked={value === "Muški"}
                disabled={disable}
              />
              <label className="form-check-label" htmlFor="exampleRadios1">
                Muški
              </label>
            </div>
            <div className="form-check col-sm-12 col-md-6">
              <input
                type="radio"
                name="exampleRadios"
                id="exampleRadios2"
                value="Ženski"
                onClick={(e) => handleChange(e.target.value, attribute)}
                checked={value === "Ženski"}
                disabled={disable}
              />
              <label className="form-check-label" htmlFor="exampleRadios2">
                Ženski
              </label>
            </div>
            {error && value === "" && (
              <small id="emailHelp" className="text-danger pl-3">
                {errorMessages.mustChoose}
              </small>
            )}
          </div>
        ) : (
          <React.Fragment>
            <input
              className={`login-input mr-auto ${
                error === true && value === "" && "border-danger"
              }`}
              type={type}
              onChange={(e) => handleChange(e.target.value, attribute)}
              value={value}
              disabled={disable}
            />
            {error && (
              <small id="emailHelp" className="form-text text-danger">
                {error}
              </small>
            )}
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export default FormInput;
