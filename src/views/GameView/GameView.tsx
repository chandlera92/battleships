import React, { useEffect, useState } from "react";
import { BoardGame } from "../../components/GameBoard";
import { CoordinateForm } from "../../components/CoordinateForm";
import { Modal } from "../../components/Modal";
import { useGameBoardContext } from "../../context/GameBoardContext";
import { useCoordinateFormContext } from "../../context/CoordinateFormContext";

export const GameView = () => {
  const gameBoard = useGameBoardContext();
  const coordinateForm = useCoordinateFormContext();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!gameBoard.shipCellsRemaining) {
      setModalOpen(true);
      coordinateForm.reset();
    }
  }, [coordinateForm, gameBoard.shipCellsRemaining]);

  return (
    <div>
      <Modal
        isOpen={modalOpen}
        title={"Congratulations!"}
        primaryAction={{
          label: "Reset",
          onClick: () => {
            setModalOpen(false);
            gameBoard.reset();
            coordinateForm.reset();
          },
        }}
      >
        <div>
          You've sunk all the battleships! Would you like to play again?
        </div>
      </Modal>
      <BoardGame />
      <CoordinateForm />
    </div>
  );
};
