import React from "react";
import { render, screen } from "@testing-library/react";
import {
  CoordinateFormProvider,
  useCoordinateFormContext,
} from "./CoordinateFormContext";
import { GameBoardProvider } from "../GameBoardContext";

// Mock component to consume the CoordinateFormContext
const MockConsumer = () => {
  const coordinateForm = useCoordinateFormContext();
  return <div data-testid="coordinate-form">{coordinateForm?.inputValue}</div>;
};

describe("CoordinateFormContext", () => {
  it("provides the coordinate form value to consuming components", () => {
    render(
      <GameBoardProvider options={{ boardSize: 10, shipSizes: [5, 4, 4] }}>
        <CoordinateFormProvider>
          <MockConsumer />
        </CoordinateFormProvider>
      </GameBoardProvider>
    );

    const coordinateFormElement = screen.getByTestId("coordinate-form");
    expect(coordinateFormElement.textContent).toBe("");
  });

  it("throws an error if used outside of the CoordinateFormProvider", () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      render(<MockConsumer />);
    }).toThrow(
      "useCoordinateFormContext must be used within a CoordinateFormProvider"
    );

    errorSpy.mockRestore();
  });
});
