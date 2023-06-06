import { renderHook, act } from "@testing-library/react";
import { Props, GameBoard, useGameBoard } from "./useGameBoard";

describe("useGameBoard", () => {
  const props: Props = {
    boardSize: 5,
    shipSizes: [2, 3],
  };

  it("should initialize the game board and ship cells remaining", () => {
    const { result } = renderHook(() => useGameBoard(props));

    const gameBoard: GameBoard = result.current;

    expect(gameBoard.gameBoard.length).toBe(5);
    expect(gameBoard.gameBoard[0].length).toBe(5);
    expect(gameBoard.shipCellsRemaining).toBe(5);
    expect(gameBoard.totalShipCells).toBe(5);
  });

  it("should update the game board and ship cells remaining when firing at a ship cell", () => {
    const { result } = renderHook(() => useGameBoard(props));

    const gameBoard: GameBoard = result.current;

    let row = -1;
    let column = -1;

    // Find the first ship cell
    for (let i = 0; i < gameBoard.gameBoard.length; i++) {
      for (let j = 0; j < gameBoard.gameBoard[i].length; j++) {
        if (gameBoard.gameBoard[i][j].hasShip) {
          row = i;
          column = j;
          return;
        }
      }
    }

    // Fire at a cell with a ship
    act(() => {
      gameBoard.fire(row, column);
    });

    expect(gameBoard.gameBoard[row][column].isHit).toBe(true);
    expect(gameBoard.shipCellsRemaining).toBe(4);
  });

  it("should update the game board correctly when firing at an empty cell", () => {
    const { result } = renderHook(() => useGameBoard(props));

    const gameBoard: GameBoard = result.current;

    let row = -1;
    let column = -1;

    // Find the first empty cell
    for (let i = 0; i < gameBoard.gameBoard.length; i++) {
      for (let j = 0; j < gameBoard.gameBoard[i].length; j++) {
        if (!gameBoard.gameBoard[i][j].hasShip) {
          row = i;
          column = j;
          return;
        }
      }
    }

    // Fire at a cell without a ship
    act(() => {
      gameBoard.fire(row, column);
    });

    expect(gameBoard.gameBoard[row][column].isHit).toBe(true);
    expect(gameBoard.shipCellsRemaining).toBe(5);
  });

  it("should reset the game board and ship cells remaining", () => {
    const { result } = renderHook(() => useGameBoard(props));

    const gameBoard: GameBoard = result.current;

    let row = -1;
    let column = -1;

    // Find the first ship cell
    for (let i = 0; i < gameBoard.gameBoard.length; i++) {
      for (let j = 0; j < gameBoard.gameBoard[i].length; j++) {
        if (gameBoard.gameBoard[i][j].hasShip) {
          row = i;
          column = j;
          return;
        }
      }
    }

    // Fire at a cell to change the game board state
    act(() => {
      gameBoard.fire(row, column);
    });

    expect(gameBoard.gameBoard[row][column].isHit).toBe(true);
    expect(gameBoard.shipCellsRemaining).toBe(4);

    // Reset the game board
    act(() => {
      gameBoard.reset();
    });

    expect(gameBoard.gameBoard[row][column].isHit).toBe(false);
    expect(gameBoard.shipCellsRemaining).toBe(5);
  });
});
