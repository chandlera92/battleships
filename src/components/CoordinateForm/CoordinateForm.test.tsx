import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useCoordinateFormContext } from "../../context/CoordinateFormContext";
import CoordinateForm from "./CoordinateForm";

import { ErrorType } from "../../hooks/useCoordinateForm";

// Mock the useCoordinateFormContext hook
jest.mock("../../context/CoordinateFormContext", () => ({
  useCoordinateFormContext: jest.fn(),
}));

describe("CoordinateForm", () => {
  it("Should render the form", () => {
    // Mock the values returned by the useCoordinateFormContext hook
    const inputValue = "A1";
    const hasError = false;
    const handleChange = jest.fn();
    const handleSubmit = jest.fn();

    // Mock the useCoordinateFormContext hook
    (useCoordinateFormContext as jest.Mock).mockReturnValue({
      inputValue,
      hasError,
      handleChange,
      handleSubmit,
    });

    // Render the CoordinateForm component
    render(<CoordinateForm />);

    // Assertions
    expect(screen.getByLabelText("Enter Coordinates")).toBeInTheDocument();
    expect(screen.getByLabelText("Enter Coordinates")).toHaveValue(inputValue);
    expect(screen.getByText("FIRE!")).toBeInTheDocument();
  });

  it("Should display error message when there is an error", () => {
    // Mock the values returned by the useCoordinateFormContext hook
    const hasError = ErrorType.INVALID_COORDINATES;
    const errorMessage =
      "Invalid coordinates. Please enter a valid coordinate.";
    const handleChange = jest.fn();
    const handleSubmit = jest.fn();

    // Mock the useCoordinateFormContext hook
    (useCoordinateFormContext as jest.Mock).mockReturnValue({
      hasError,
      handleChange,
      handleSubmit,
    });

    // Render the CoordinateForm component
    render(<CoordinateForm />);

    // Assertions
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByLabelText("Enter Coordinates")).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });

  it("Should call handleChange on input change", () => {
    // Mock the values returned by the useCoordinateFormContext hook
    const handleChange = jest.fn();
    const handleSubmit = jest.fn();

    // Mock the useCoordinateFormContext hook
    (useCoordinateFormContext as jest.Mock).mockReturnValue({
      handleChange,
      handleSubmit,
    });

    // Render the CoordinateForm component
    render(<CoordinateForm />);

    // Trigger input change
    fireEvent.change(screen.getByLabelText("Enter Coordinates"), {
      target: { value: "A1" },
    });
    // Assertion
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("calls handleSubmit on form submission", () => {
    // Mock the values returned by the useCoordinateFormContext hook
    const handleSubmit = jest.fn();

    // Mock the useCoordinateFormContext hook
    (useCoordinateFormContext as jest.Mock).mockReturnValue({
      handleSubmit,
    });

    // Render the CoordinateForm component
    render(<CoordinateForm />);

    // Trigger form submission
    fireEvent.submit(screen.getByRole("button", { name: "FIRE!" }));

    // Assertion
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
