import React from "react";
import { GameBoardProvider } from "./context/GameBoardContext";
import { BoardGame } from "./components/GameBoard";

function App() {
  return (
    <GameBoardProvider options={{ boardSize: 10, shipSizes: [5, 4, 4] }}>
      <BoardGame />
    </GameBoardProvider>
  );
}

export default App;
