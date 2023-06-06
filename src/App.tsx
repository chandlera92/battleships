import React from "react";
import { GameBoardProvider } from "./context/GameBoardContext";
import { CoordinateFormProvider } from "./context/CoordinateFormContext";
import { GameView } from "./views/GameView/GameView";

function App() {
  return (
    <GameBoardProvider options={{ boardSize: 10, shipSizes: [5, 4, 4] }}>
      <CoordinateFormProvider>
        <GameView />
      </CoordinateFormProvider>
    </GameBoardProvider>
  );
}

export default App;
