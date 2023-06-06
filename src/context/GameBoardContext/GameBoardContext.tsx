import React, { createContext, useContext } from "react";
import type {
  GameBoard,
  Props as GameBoardProps,
} from "../../hooks/useGameBoard";
import { useGameBoard } from "../../hooks/useGameBoard";

// Define the type for the value of the GameBoard context
type GameBoardContextValue = GameBoard | null;

// Create the GameBoard context
export const GameBoardContext = createContext<GameBoardContextValue>(null);

// Create the GameBoard provider component
export const GameBoardProvider = ({
  options,
  children,
}: {
  options: GameBoardProps;
  children: React.ReactNode;
}) => {
  // Use the useGameBoard hook to generate the game board and manage its state
  const gameBoard = useGameBoard(options);

  return (
    <GameBoardContext.Provider value={gameBoard}>
      {children}
    </GameBoardContext.Provider>
  );
};

// Custom hook to access the GameBoard context
export const useGameBoardContext = () => {
  const context = useContext(GameBoardContext);
  if (!context) {
    throw new Error(
      "useGameBoardContext must be used within a GameBoardProvider"
    );
  }
  return context;
};
