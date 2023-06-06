import { ChangeEvent, FormEvent, useState } from "react";
import { useGameBoardContext } from "../../context/GameBoardContext";

export enum ErrorType {
  INVALID_COORDINATES = "INVALID_COORDINATES",
  CELL_ALREADY_FIRED = "CELL_ALREADY_FIRED",
}

export type CoordinateForm = {
  inputValue: string;
  hasError: ErrorType | false;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
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
  const parseValue = (value: string): [string, number] => {
    const yAxisRegex = /^[a-zA-Z]+/;
    const xAisRegex = /\d+$/;

    const y = value.match(yAxisRegex)?.[0] || "";
    const x = value.match(xAisRegex)?.[0] || "";

    return [y, Number(x)];
  };

  // Event handler for input value change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setHasError(validateInput(value));
  };

  // Function to validate the input value
  const validateInput = (value: string): ErrorType | false => {
    if (value.length < 2) {
      return ErrorType.INVALID_COORDINATES;
    }

    const [y, x] = parseValue(value);

    if (!xAxis.includes(Number(x)) || !yAxis.includes(y.toLowerCase())) {
      return ErrorType.INVALID_COORDINATES;
    }

    const row = xAxis.indexOf(x);
    const column = yAxis.indexOf(y.toLowerCase());

    if (gameBoard[row][column].isHit) {
      return ErrorType.CELL_ALREADY_FIRED;
    }

    return false;
  };

  // Event handler for form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!hasError) {
      const [y, x] = parseValue(inputValue);
      fire(yAxis.indexOf(y.toLowerCase()), xAxis.indexOf(x));
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
