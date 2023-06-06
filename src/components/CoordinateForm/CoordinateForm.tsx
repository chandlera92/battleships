import React from "react";
import { useCoordinateFormContext } from "../../context/CoordinateFormContext";
import "./CoordinateForm.scss";
import { ErrorType } from "../../hooks/useCoordinateForm";

export const CoordinateForm: React.FC = () => {
  const { handleSubmit, inputValue, handleChange, hasError } =
    useCoordinateFormContext();

  const getErrorMessage = (errorType: ErrorType) => {
    switch (errorType) {
      case ErrorType.INVALID_COORDINATES: {
        return "Invalid coordinates. Please enter a valid coordinate.";
      }
      case ErrorType.CELL_ALREADY_FIRED: {
        return "Cell already fired. Please enter a valid coordinate.";
      }
      default: {
        return "There was an error. Please enter a valid coordinate.";
      }
    }
  };

  return (
    <div className="boardGameEntryForm" data-testid={"coordinateForm"}>
      <form onSubmit={handleSubmit} className="formContainer">
        <div className="formInputGroup">
          <label htmlFor="coordinateInput" className="formLabel">
            Enter Coordinates
          </label>
          <input
            type="text"
            id="coordinateInput"
            value={inputValue}
            onChange={(e) => handleChange(e.target.value)}
            className={`formInput ${Boolean(hasError) ? "invalid" : ""}`}
            title="Enter a coordinate in the format 'A1'"
            aria-invalid={Boolean(hasError)}
            aria-describedby="validationMessage"
          />
          {hasError && (
            <div id="validationMessage" className="validationMessage">
              {getErrorMessage(hasError)}
            </div>
          )}
          <button
            type="submit"
            className="formButton"
            disabled={Boolean(hasError)}
          >
            FIRE!
          </button>
        </div>
      </form>
    </div>
  );
};

export default CoordinateForm;
