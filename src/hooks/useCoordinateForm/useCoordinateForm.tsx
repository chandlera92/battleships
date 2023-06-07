import { FormEvent, useState } from "react";
import { useGameBoardContext } from "../../context/GameBoardContext";

export enum ErrorType {
  INVALID_COORDINATES = "INVALID_COORDINATES",
  CELL_ALREADY_FIRED = "CELL_ALREADY_FIRED",
}

export type CoordinateForm = {
  inputValue: string;
  hasError: ErrorType | false;
  handleChange: (value: string) => void;
  handleSubmit: (e: FormEvent) => void;
  reset: () => void;
};

// Custom hook for handling coordinate form logic
export const useCoordinateForm = (): CoordinateForm => {
  // Get necessary values from the game board context
  // TODO: Think about if it's worth it to pass in the required parameters of the board instead of using the context directly
  //       This would make the hook more reusable, but it would also make it more complex.
  //       This is a tradeoff to consider, in this case unless a use case for reusability is found, I would keep it simple and use the context directly.
  const { gameBoard, fire, xAxis, yAxis } = useGameBoardContext();

  // State for input value and validation
  const [inputValue, setInputValue] = useState<string>("");
  const [hasError, setHasError] = useState<ErrorType | false>(false);

  // Function to parse the input value and extract the coordinate values
  const parseValue = (
    value: string
  ): {
    x: string;
    y: number;
    row: number;
    column: number;
  } => {
    const xAxisRegex = /^[a-zA-Z]+/;
    const yAisRegex = /\d+$/;

    const x = (value.match(xAxisRegex)?.[0] || "").toLowerCase();
    const y = Number(value.match(yAisRegex)?.[0]) || -1;

    const row = yAxis.indexOf(y);
    const column = xAxis.indexOf(x);

    return { x, y, row, column };
  };

  // Event handler for input value change
  const handleChange = (value: string) => {
    setInputValue(value);
    setHasError(validateInput(value));
  };

  // Function to validate the input value
  const validateInput = (value: string): ErrorType | false => {
    if (value.length < 2) {
      return ErrorType.INVALID_COORDINATES;
    }

    const { x, y, row, column } = parseValue(value);

    if (!xAxis.includes(x) || !yAxis.includes(y)) {
      return ErrorType.INVALID_COORDINATES;
    }

    if (gameBoard[row][column].isHit) {
      return ErrorType.CELL_ALREADY_FIRED;
    }

    return false;
  };

  // Event handler for form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!hasError) {
      const { row, column } = parseValue(inputValue);
      fire(row, column);
      setInputValue("");
    }
  };

  const reset = () => {
    setHasError(false);
    setInputValue("");
  };

  // Return the coordinate form object
  return {
    inputValue,
    hasError,
    handleChange,
    handleSubmit,
    reset,
  };
};
