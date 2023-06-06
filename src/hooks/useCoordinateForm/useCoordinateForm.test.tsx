import { renderHook, act } from "@testing-library/react";
import { useGameBoardContext } from "../../context/GameBoardContext";
import {
  useCoordinateForm,
  CoordinateForm,
  ErrorType,
} from "./useCoordinateForm";
import { GameBoard } from "../useGameBoard";

// Mock the useGameBoardContext hook
jest.mock("../../context/GameBoardContext");

// Mock the game board values from the game board context
const mockGameBoard = [
  [{ isHit: false }, { isHit: false }],
  [{ isHit: false }, { isHit: false }],
];

// Mock the fire function from the game board context
const mockFire = jest.fn();

// Mock the xAxis and yAxis values from the game board context
const mockXAxis = [1, 2];
const mockYAxis = ["a", "b"];

describe("useCoordinateForm", () => {
  beforeEach(() => {
    // Reset mock functions and values before each test
    jest.clearAllMocks();

    // Mock the useGameBoardContext hook values
    (useGameBoardContext as jest.Mock).mockReturnValue({
      gameBoard: mockGameBoard,
      fire: mockFire,
      xAxis: mockXAxis,
      yAxis: mockYAxis,
    });
  });

  it("Should handle input value change and validation", () => {
    const { result } = renderHook(() => useCoordinateForm());

    // Initial state
    expect(result.current.inputValue).toBe("");
    expect(result.current.hasError).toBe(false);

    // Simulate input value change
    act(() => {
      result.current.handleChange({ target: { value: "a1" } } as any);
    });

    // Updated state
    expect(result.current.inputValue).toBe("a1");
    expect(result.current.hasError).toBe(false);
  });

  it("Should validate input value correctly", () => {
    const { result } = renderHook(() => useCoordinateForm());

    // Valid input
    act(() => {
      result.current.handleChange({ target: { value: "b2" } } as any);
    });
    expect(result.current.hasError).toBe(false);

    // Invalid input (length less than 2)
    act(() => {
      result.current.handleChange({ target: { value: "a" } } as any);
    });
    expect(result.current.hasError).toBe(ErrorType.INVALID_COORDINATES);

    // Invalid input (invalid x-axis value)
    act(() => {
      result.current.handleChange({ target: { value: "c1" } } as any);
    });
    expect(result.current.hasError).toBe(ErrorType.INVALID_COORDINATES);

    // Invalid input (invalid y-axis value)
    act(() => {
      result.current.handleChange({ target: { value: "b3" } } as any);
    });
    expect(result.current.hasError).toBe(ErrorType.INVALID_COORDINATES);

    // Invalid input (cell already fired)
    mockGameBoard[1][0].isHit = true; // Mark cell as already fired
    act(() => {
      result.current.handleChange({ target: { value: "a2" } } as any);
    });
    expect(result.current.hasError).toBe(ErrorType.CELL_ALREADY_FIRED);
  });

  it("Should handle form submission and trigger fire function", () => {
    const { result } = renderHook(() => useCoordinateForm());

    // Simulate input value change
    act(() => {
      result.current.handleChange({ target: { value: "b2" } } as any);
    });

    // Simulate form submission
    act(() => {
      result.current.handleSubmit({ preventDefault: jest.fn() } as any);
    });

    // Verify that the fire function is called with correct arguments
    expect(mockFire).toHaveBeenCalledWith(1, 1);
    expect(result.current.inputValue).toBe("");
  });

  it("Should not trigger fire function if there is an error", () => {
    const { result } = renderHook(() => useCoordinateForm());

    // Simulate input value change with an error
    act(() => {
      result.current.handleChange({ target: { value: "c1" } } as any);
    });

    // Simulate form submission
    act(() => {
      result.current.handleSubmit({ preventDefault: jest.fn() } as any);
    });

    // Verify that the fire function is not called
    expect(mockFire).not.toHaveBeenCalled();
  });
});
