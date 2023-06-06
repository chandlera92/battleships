import { useState } from "react";
import { generateYAxis, buildGameBoard, Grid } from "../../utils";

export type Props = {
  boardSize: number;
  shipSizes: number[];
};

export type GameBoard = {
  boardSize: number;
  gameBoard: Grid;
  fire: (rowIndex: number, cellIndex: number) => void;
  reset: () => void;
  shipCellsRemaining: number;
  totalShipCells: number;
  xAxis: number[];
  yAxis: string[];
};

/*
 * Generates the game board and manages its state.
 * This custom React hook initializes and updates the game board state,
 * as well as provides functions for firing at cells and resetting the board.
 */
const useGameBoard = ({ boardSize, shipSizes }: Props): GameBoard => {
  const totalShipCells = shipSizes.reduce((acc, ship) => {
    return acc + ship;
  }, 0);

  // Initialize the game board state and ship cells remaining state
  const [gameBoard, setGameBoard] = useState(
    buildGameBoard(boardSize, shipSizes)
  );
  const [shipCellsRemaining, setShipCellsRemaining] = useState(totalShipCells);

  // Function for firing at a specific cell on the game board
  const fire = (rowIndex: number, cellIndex: number) => {
    const updatedBoard = [...gameBoard];
    updatedBoard[rowIndex][cellIndex] = {
      ...gameBoard[rowIndex][cellIndex],
      isHit: true,
    };

    // Decrease the ship cells remaining count if the fired cell contains a ship
    if (updatedBoard[rowIndex][cellIndex].hasShip) {
      setShipCellsRemaining(shipCellsRemaining - 1);
    }

    setGameBoard(updatedBoard);
  };

  // Generate the x-axis and y-axis labels for the game board
  const xAxis = Array.from({ length: boardSize }, (_, i) => i + 1);
  const yAxis = generateYAxis(boardSize);

  // Function for resetting the game board to its initial state
  const reset = () => {
    setGameBoard(buildGameBoard(boardSize, shipSizes));
    setShipCellsRemaining(totalShipCells);
  };

  return {
    boardSize,
    fire,
    gameBoard,
    reset,
    shipCellsRemaining,
    totalShipCells,
    xAxis,
    yAxis,
  };
};

export default useGameBoard;
