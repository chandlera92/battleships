import React from "react";
import { useGameBoardContext } from "../../context/GameBoardContext";
import "./GameBoard.scss";
import clsx from "clsx";

export const BoardGame: React.FC = () => {
  // Retrieve necessary data from the GameBoardContext
  const {
    gameBoard,
    fire,
    boardSize,
    xAxis,
    yAxis,
    shipCellsRemaining,
    totalShipCells,
  } = useGameBoardContext();

  return (
    <div className="boardGameWrapper" data-testid={"boardGame"}>
      {/* Game Board Info */}
      <div className="boardGameInfo">
        <div className="boardGameTitle">Battleships</div>
        <div className="boardGameCounter">
          {shipCellsRemaining} / {totalShipCells} cells remaining
        </div>
      </div>

      {/* Game Board Container */}
      <div
        className="boardGameContainer"
        style={{
          gridTemplateColumns: `minmax(16px, auto) repeat(${boardSize}, 1fr)`,
        }}
      >
        {/* X-Axis Labels */}
        <div className="boardGameRow">
          <div />
          {xAxis.map((label) => (
            <div
              className="boardGameXAxisCell"
              data-testid={"x-axis-label"}
              key={label}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Game Board Rows */}
        {gameBoard.map((row, rowIndex) => (
          <div className="boardGameRow" key={rowIndex}>
            {/* Y-Axis Labels */}
            <div className="boardGameYAxisCell" data-testid={"y-axis-label"}>
              {yAxis[rowIndex].toUpperCase()}
            </div>

            {/* Game Board Cells */}
            {row.map((cell, cellIndex) => {
              const cellKey = `${yAxis[rowIndex]}${xAxis[cellIndex]}`;
              return (
                <div
                  className={clsx("boardGameCell", {
                    ship: cell.hasShip,
                    touched: cell.isHit,
                    untouched: !cell.isHit,
                  })}
                  id={cellKey}
                  onClick={() => !cell.isHit && fire(rowIndex, cellIndex)}
                  key={cellKey}
                  data-testid={"game-board-cell"}
                >
                  {/* Cell Marker */}
                  {cell.isHit ? (
                    <div
                      data-testid={"game-board-cell-marker"}
                      className={clsx("boardGameCellMarker", {
                        boardGameCellMarkerShip: cell.hasShip,
                      })}
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
