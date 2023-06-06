import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { useGameBoardContext } from "../../context/GameBoardContext";
import { BoardGame } from "./GameBoard";

jest.mock("../../context/GameBoardContext");
const fireMock = jest.fn();

describe("BoardGame component", () => {
  beforeEach(() => {
    // Mock the return value of the useGameBoardContext hook
    (useGameBoardContext as jest.Mock).mockReturnValue({
      gameBoard: [
        [
          { hasShip: false, isHit: false },
          { hasShip: false, isHit: false },
          { hasShip: false, isHit: true },
        ],
        [
          { hasShip: true, isHit: true },
          { hasShip: true, isHit: false },
          { hasShip: true, isHit: false },
        ],
        [
          { hasShip: false, isHit: false },
          { hasShip: false, isHit: false },
          { hasShip: false, isHit: false },
        ],
      ],
      fire: fireMock,
      boardSize: 3,
      yAxis: ["A", "B", "C"],
      xAxis: ["1", "2", "3"],
      shipCellsRemaining: 3,
      totalShipCells: 3,
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render the base game board", () => {
    render(<BoardGame />);

    // Assert the presence of the title
    expect(screen.getByText("Battleships")).toBeInTheDocument();

    // Assert the presence of the ship cells remaining information
    expect(screen.getByText("3 / 3 cells remaining")).toBeInTheDocument();

    screen.getAllByTestId("y-axis-label").forEach((label, index) => {
      expect(label.innerHTML).toEqual(useGameBoardContext().yAxis[index]);
    });

    screen.getAllByTestId("x-axis-label").forEach((label, index) => {
      expect(label.innerHTML).toEqual(useGameBoardContext().xAxis[index]);
    });

    // Assert the presence of the grid cells
    expect(screen.getAllByTestId("game-board-cell")).toHaveLength(9);
  });

  it("Should display a marker for cells that have been hit", () => {
    render(<BoardGame />);

    expect(screen.getAllByTestId("game-board-cell-marker")).toHaveLength(2);
  });

  it("Should add specific class for an empty cell hit", () => {
    render(<BoardGame />);

    const emptyCellsThatHaveBeenHit = screen
      .getAllByTestId("game-board-cell")
      .filter((cell) => {
        return (
          cell.className.includes("touched") &&
          !cell.className.includes("ship") &&
          !cell.className.includes("untouched")
        );
      });

    expect(emptyCellsThatHaveBeenHit).toHaveLength(1);
  });

  it("Should add specific class for an ship cell hit", () => {
    render(<BoardGame />);

    const shipCellsThatHaveBeenHit = screen
      .getAllByTestId("game-board-cell")
      .filter((cell) => {
        return (
          !cell.className.includes("untouched") &&
          cell.className.includes("ship")
        );
      });

    expect(shipCellsThatHaveBeenHit).toHaveLength(1);
  });

  it("Should trigger the fire function when an untouched cell is clicked", () => {
    render(<BoardGame />);

    const untouchedCells = screen
      .getAllByTestId("game-board-cell")
      .filter((cell) => {
        return !cell.classList.contains("touched");
      });

    untouchedCells.forEach((cell) => {
      fireEvent.click(cell);
    });

    expect(fireMock).toHaveBeenCalledTimes(untouchedCells.length);
  });

  it("Should not trigger the fire function when an touched cell is clicked", () => {
    render(<BoardGame />);

    const touchedCells = screen
      .getAllByTestId("game-board-cell")
      .filter((cell) => {
        return cell.classList.contains("touched");
      });

    touchedCells.forEach((cell) => {
      fireEvent.click(cell);
    });

    expect(fireMock).not.toHaveBeenCalled();
  });
});
