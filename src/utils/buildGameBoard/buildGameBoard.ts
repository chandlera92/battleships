export type Grid = { hasShip: boolean; isHit: boolean }[][];

const ORIENTATION_NORTH = 0;
const ORIENTATION_EAST = 1;
const ORIENTATION_SOUTH = 2;
const ORIENTATION_WEST = 3;

/*
 * This is a naive implementation of placing ships randomly on a grid.
 * If there are ships still to be placed on the grid, but no possible room for them, the app will crash.
 * This is because the function will recursively call itself until it finds a valid position for the ship.
 * This is not a problem given the constraints of the test, and probably unlikely in a real world scenario if we add a fixed grid size and amount of ships as a constraint.
 * There are a few ways we could make this more robust;
 * 1. We could add a maximum number of retries, and if we exceed that, we could throw an error.
 * 2. We could add a maximum number of retries, and if we exceed that, we could return the grid as is, and the game could continue with the ships that have been placed.
 * 3. We could determine the number of ships that can fit on the grid, and if we exceed that, we could throw an error.
 * 4. We could implement a more sophisticated algorithm for placing ships, such as a backtracking algorithm.
 * Due to the brief of the test, I have chosen to leave this as is to keep the implementation straightforward.
 * */

/**
 * Randomly places a ship on the grid, ensuring it does not overlap with other ships or go out of bounds.
 * @param grid The game board grid.
 * @param gridSize The size of the grid.
 * @param shipSize The size of the ship to be placed.
 */
export function placeShip(
  grid: Grid,
  gridSize: number,
  shipSize: number
): void {
  const orientation = Math.floor(Math.random() * 4); // Randomly choose the orientation of the ship
  let row: number = -1,
    col: number = -1; // Initialize with -1 as placeholder values before assigning actual coordinates

  // Choose a random starting position for the ship, ensuring it's within the grid's bounds.
  switch (orientation) {
    case ORIENTATION_NORTH: {
      row = Math.floor(Math.random() * (gridSize - shipSize + 1));
      col = Math.floor(Math.random() * gridSize);
      break;
    }
    case ORIENTATION_EAST: {
      row = Math.floor(Math.random() * gridSize);
      col = Math.floor(Math.random() * (gridSize - shipSize + 1));
      break;
    }
    case ORIENTATION_SOUTH: {
      row =
        Math.floor(Math.random() * (gridSize - shipSize + 1)) + (shipSize - 1);
      col = Math.floor(Math.random() * gridSize);
      break;
    }
    case ORIENTATION_WEST: {
      row = Math.floor(Math.random() * gridSize);
      col =
        Math.floor(Math.random() * (gridSize - shipSize + 1)) + (shipSize - 1);
      break;
    }
  }

  // Check if the chosen position is already occupied by another ship
  // If occupied or out of bounds, retry placing the ship
  for (let i = 0; i < shipSize; i++) {
    switch (orientation) {
      case ORIENTATION_NORTH: {
        if (grid[row + i][col]?.hasShip) {
          placeShip(grid, gridSize, shipSize);
          return;
        }
        break;
      }
      case ORIENTATION_EAST: {
        if (grid[row][col + i]?.hasShip) {
          placeShip(grid, gridSize, shipSize);
          return;
        }
        break;
      }
      case ORIENTATION_SOUTH: {
        if (grid[row - i][col]?.hasShip) {
          placeShip(grid, gridSize, shipSize);
          return;
        }
        break;
      }
      case ORIENTATION_WEST: {
        if (grid[row][col - i]?.hasShip) {
          placeShip(grid, gridSize, shipSize);
          return;
        }
        break;
      }
    }
  }

  // Mark the cells occupied by the ship
  for (let i = 0; i < shipSize; i++) {
    switch (orientation) {
      case ORIENTATION_NORTH: {
        grid[row + i][col].hasShip = true;
        break;
      }
      case ORIENTATION_EAST: {
        grid[row][col + i].hasShip = true;
        break;
      }
      case ORIENTATION_SOUTH: {
        grid[row - i][col].hasShip = true;
        break;
      }
      case ORIENTATION_WEST: {
        grid[row][col - i].hasShip = true;
        break;
      }
    }
  }
}

/**
 * Builds the game board grid based on the provided size and ship sizes.
 * @param gridSize The size of the grid.
 * @param shipSizes The sizes of the ships to be placed.
 * @returns The game board grid.
 */
export const buildGameBoard = (gridSize: number, shipSizes: number[]): Grid => {
  /* First generate an empty playing grid */
  let grid: Grid = [];

  for (let i = 0; i < gridSize; i++) {
    grid[i] = [];
    for (let j = 0; j < gridSize; j++) {
      grid[i][j] = { hasShip: false, isHit: false };
    }
  }

  /* Place ships on the grid, ensuring no out of bound placement or collisions */
  for (const shipSize of shipSizes) {
    placeShip(grid, gridSize, shipSize);
  }

  return grid;
};
