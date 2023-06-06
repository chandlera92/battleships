import { renderHook, act } from "@testing-library/react-hooks";
import useGameBoard, { Props, GameBoard } from "./useGameBoard";

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

  it("should update the game board and ship cells remaining when firing at a cell", () => {
    const { result } = renderHook(() => useGameBoard(props));

    const gameBoard: GameBoard = result.current;

    // Fire at a cell with a ship
    act(() => {
      gameBoard.fire(0, 0);
    });

    expect(gameBoard.gameBoard[0][0].isHit).toBe(true);
    expect(gameBoard.shipCellsRemaining).toBe(4);

    // Fire at a cell without a ship
    act(() => {
      gameBoard.fire(1, 1);
    });

    expect(gameBoard.gameBoard[1][1].isHit).toBe(true);
    expect(gameBoard.shipCellsRemaining).toBe(4);
  });

  it("should reset the game board and ship cells remaining", () => {
    const { result } = renderHook(() => useGameBoard(props));

    const gameBoard: GameBoard = result.current;

    // Fire at a cell to change the game board state
    act(() => {
      gameBoard.fire(0, 0);
    });

    expect(gameBoard.gameBoard[0][0].isHit).toBe(true);
    expect(gameBoard.shipCellsRemaining).toBe(4);

    // Reset the game board
    act(() => {
      gameBoard.reset();
    });

    expect(gameBoard.gameBoard[0][0].isHit).toBe(false);
    expect(gameBoard.shipCellsRemaining).toBe(5);
  });
});
