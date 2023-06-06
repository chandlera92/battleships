import React from "react";
import { render, screen } from "@testing-library/react";
import { GameBoardProvider, useGameBoardContext } from "./GameBoardContext";

// Mock component to consume the GameBoardContext
const MockConsumer = () => {
  const gameBoard = useGameBoardContext();
  return <div data-testid="game-board">{gameBoard?.boardSize}</div>;
};

// Mock options for the GameBoardProvider
const mockOptions = {
  boardSize: 10,
  shipSizes: [5, 4, 4],
};

describe("GameBoardContext", () => {
  it("provides the game board value to consuming components", () => {
    render(
      <GameBoardProvider options={mockOptions}>
        <MockConsumer />
      </GameBoardProvider>
    );

    const gameBoardElement = screen.getByTestId("game-board");
    expect(gameBoardElement.textContent).toBe("10");
  });

  it("throws an error if used outside of the GameBoardProvider", () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      render(<MockConsumer />);
    }).toThrow("useGameBoardContext must be used within a GameBoardProvider");

    errorSpy.mockRestore();
  });
});
