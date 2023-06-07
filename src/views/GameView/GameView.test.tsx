import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { GameView } from "./GameView";
import { useGameBoardContext } from "../../context/GameBoardContext";
import { useCoordinateFormContext } from "../../context/CoordinateFormContext";

jest.mock("../../context/GameBoardContext");
jest.mock("../../context/CoordinateFormContext");

const defaultGameBoardContextOptions = {
  boardSize: 3,
  gameBoard: [
    [{ isHit: false }, { isHit: false }, { isHit: false }],
    [{ isHit: false }, { isHit: false }, { isHit: false }],
    [{ isHit: false }, { isHit: false }, { isHit: false }],
  ],
  fire: jest.fn(),
  reset: jest.fn(),
  shipCellsRemaining: 1, // All ship cells are sunk
  totalShipCells: 9, // Total number of cells in the grid
  xAxis: ["A", "B", "C"],
  yAxis: [1, 2, 3],
};

const defaultCoordinateFormContextOptions = {
  inputValue: "A1",
  hasError: false,
  handleChange: jest.fn(),
  handleSubmit: jest.fn(),
  reset: jest.fn(),
};

describe("GameView", () => {
  let modalRoot: HTMLElement | null;
  beforeEach(() => {
    // Reset mock functions and values before each test
    jest.clearAllMocks();

    modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modalRoot");
    document.body.appendChild(modalRoot);
  });

  afterEach(() => {
    if (modalRoot) {
      document.body.removeChild(modalRoot);
      modalRoot = null;
    }

    cleanup();
  });

  it("Should render BoardGame and CoordinateForm components", () => {
    // Mock the useGameBoardContext hook values
    (useGameBoardContext as jest.Mock).mockReturnValue(
      defaultGameBoardContextOptions
    );

    // Mock the useCoordinateFormContext hook values
    (useCoordinateFormContext as jest.Mock).mockReturnValue(
      defaultCoordinateFormContextOptions
    );

    render(<GameView />);

    const boardGameComponent = screen.getByTestId("boardGame");
    const coordinateFormComponent = screen.getByTestId("coordinateForm");

    expect(boardGameComponent).toBeInTheDocument();
    expect(coordinateFormComponent).toBeInTheDocument();
  });

  it("Should show the congratulations modal when all ship cells are sunk", () => {
    // Mock the useGameBoardContext hook values
    (useGameBoardContext as jest.Mock).mockReturnValue({
      ...defaultGameBoardContextOptions,
      shipCellsRemaining: 0,
    });

    // Mock the useCoordinateFormContext hook values
    (useCoordinateFormContext as jest.Mock).mockReturnValue(
      defaultCoordinateFormContextOptions
    );

    render(<GameView />);

    const congratulationsModal = screen.getByTestId("modal");
    const resetButton = screen.getByText("Reset");

    expect(congratulationsModal).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
  });

  it("Should call the reset functions when reset button is clicked", () => {
    // Mock the useGameBoardContext hook values
    const gameBoardResetMock = jest.fn();
    (useGameBoardContext as jest.Mock).mockReturnValue({
      ...defaultGameBoardContextOptions,
      shipCellsRemaining: 0,
      reset: gameBoardResetMock,
    });

    // Mock the useCoordinateFormContext hook values
    const coordinateFormResetMock = jest.fn();
    (useCoordinateFormContext as jest.Mock).mockReturnValue({
      ...defaultCoordinateFormContextOptions,
      reset: coordinateFormResetMock,
    });

    render(<GameView />);

    const resetButton = screen.getByText("Reset");
    fireEvent.click(resetButton);

    expect(gameBoardResetMock).toHaveBeenCalledTimes(1);
    expect(coordinateFormResetMock).toHaveBeenCalledTimes(2); // Twice as it's called in the useEffect hook and on button click.
  });
});
