import React from "react";
import { GameBoardProvider } from "./context/GameBoardContext";
import { BoardGame } from "./components/GameBoard";
import { CoordinateFormProvider } from "./context/CoordinateFormContext";
import { CoordinateForm } from "./components/CoordinateForm";

function App() {
  return (
    <GameBoardProvider options={{ boardSize: 10, shipSizes: [5, 4, 4] }}>
      <CoordinateFormProvider>
        <BoardGame />
        <CoordinateForm />
      </CoordinateFormProvider>
    </GameBoardProvider>
  );
}

export default App;
