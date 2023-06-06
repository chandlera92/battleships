import { buildGameBoard, placeShip } from "./buildGameBoard";

const gridSize = 3;
const shipSizes = [3];

describe("buildGameBoard", () => {
  beforeEach(() => {
    const mockRandom = jest.spyOn(Math, "random");
    mockRandom.mockRestore();
    jest.resetAllMocks();
  });

  it("Should return game board with two ship after collision detected.", () => {
    const mockedGrid = [
      [
        { hasShip: false, isHit: false },
        { hasShip: true, isHit: false },
        { hasShip: false, isHit: false },
      ],
      [
        { hasShip: false, isHit: false },
        { hasShip: true, isHit: false },
        { hasShip: false, isHit: false },
      ],
      [
        { hasShip: false, isHit: false },
        { hasShip: true, isHit: false },
        { hasShip: false, isHit: false },
      ],
    ];
    const mockRandom = jest.spyOn(Math, "random");
    mockRandom
      .mockImplementationOnce(() => 0.5) // Mock random orientation: North
      .mockImplementationOnce(() => 0.2) // Mock random row index: 0
      .mockImplementationOnce(() => 0.5); // Mock random column index: 2

    placeShip(mockedGrid, gridSize, 3);

    expect(mockedGrid.flat().filter((cell) => cell.hasShip)).toHaveLength(6);
  });

  it("Should return game board with one ship, with orientation south.", () => {
    const mockedGrid = [
      [
        { hasShip: false, isHit: false },
        { hasShip: true, isHit: false },
        { hasShip: false, isHit: false },
      ],
      [
        { hasShip: false, isHit: false },
        { hasShip: true, isHit: false },
        { hasShip: false, isHit: false },
      ],
      [
        { hasShip: false, isHit: false },
        { hasShip: true, isHit: false },
        { hasShip: false, isHit: false },
      ],
    ];
    const mockRandom = jest.spyOn(Math, "random");
    mockRandom
      .mockImplementationOnce(() => 0.5) // Mock random orientation: North
      .mockImplementationOnce(() => 0.2) // Mock random row index: 0
      .mockImplementationOnce(() => 0.5); // Mock random column index: 2

    const result = buildGameBoard(gridSize, shipSizes);

    expect(result).toEqual(mockedGrid);
  });

  it("Should return game board with one ship, with orientation north.", () => {
    const mockedGrid = [
      [
        { hasShip: false, isHit: false },
        { hasShip: true, isHit: false },
        { hasShip: false, isHit: false },
      ],
      [
        { hasShip: false, isHit: false },
        { hasShip: true, isHit: false },
        { hasShip: false, isHit: false },
      ],
      [
        { hasShip: false, isHit: false },
        { hasShip: true, isHit: false },
        { hasShip: false, isHit: false },
      ],
    ];
    const mockRandom = jest.spyOn(Math, "random");
    mockRandom
      .mockImplementationOnce(() => 0.2) // Mock random orientation: North
      .mockImplementationOnce(() => 0.99) // Mock random row index: 0
      .mockImplementationOnce(() => 0.5); // Mock random column index: 2

    const result = buildGameBoard(gridSize, shipSizes);

    expect(result).toEqual(mockedGrid);
  });

  it("Should return game board with one ship, with orientation east.", () => {
    const mockedGrid = [
      [
        { hasShip: true, isHit: false },
        { hasShip: true, isHit: false },
        { hasShip: true, isHit: false },
      ],
      [
        { hasShip: false, isHit: false },
        { hasShip: false, isHit: false },
        { hasShip: false, isHit: false },
      ],
      [
        { hasShip: false, isHit: false },
        { hasShip: false, isHit: false },
        { hasShip: false, isHit: false },
      ],
    ];
    const mockRandom = jest.spyOn(Math, "random");
    mockRandom
      .mockImplementationOnce(() => 0.4) // Mock random orientation: East
      .mockImplementationOnce(() => 0) // Mock random row index: 0
      .mockImplementationOnce(() => 0); // Mock random column index: 0

    const result = buildGameBoard(gridSize, shipSizes);

    expect(result).toEqual(mockedGrid);
  });

  it("Should return game board with one ship, with orientation west.", () => {
    const mockedGrid = [
      [
        { hasShip: true, isHit: false },
        { hasShip: true, isHit: false },
        { hasShip: true, isHit: false },
      ],
      [
        { hasShip: false, isHit: false },
        { hasShip: false, isHit: false },
        { hasShip: false, isHit: false },
      ],
      [
        { hasShip: false, isHit: false },
        { hasShip: false, isHit: false },
        { hasShip: false, isHit: false },
      ],
    ];
    const mockRandom = jest.spyOn(Math, "random");
    mockRandom
      .mockImplementationOnce(() => 0.8) // Mock random orientation: West
      .mockImplementationOnce(() => 0) // Mock random row index: 0
      .mockImplementationOnce(() => 0.8); // Mock random column index: 2

    const result = buildGameBoard(gridSize, shipSizes);

    expect(result).toEqual(mockedGrid);
  });
});
