import { renderHook, act } from "@testing-library/react";
import { useGameBoardContext } from "../../context/GameBoardContext";
import { useCoordinateForm, ErrorType } from "./useCoordinateForm";

// Mock the useGameBoardContext hook
jest.mock("../../context/GameBoardContext");

// Mock the game board values from the game board context
const mockGameBoard = [
  [{ isHit: false }, { isHit: false }],
  [{ isHit: true }, { isHit: false }],
];

// Mock the fire function from the game board context
const mockFire = jest.fn();

// Mock the xAxis and yAxis values from the game board context
const mockXAxis = ["a", "b"];
const mockYAxis = [1, 2];

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
      result.current.handleChange("a1");
    });

    // Updated state
    expect(result.current.inputValue).toBe("a1");
    expect(result.current.hasError).toBe(false);
  });

  it("Should validate input value correctly", () => {
    const { result } = renderHook(() => useCoordinateForm());

    // Valid input
    act(() => {
      result.current.handleChange("b2");
    });
    expect(result.current.hasError).toBe(false);

    // Invalid input (length less than 2)
    act(() => {
      result.current.handleChange("a");
    });
    expect(result.current.hasError).toBe(ErrorType.INVALID_COORDINATES);

    // Invalid input (invalid x-axis value)
    act(() => {
      result.current.handleChange("c1");
    });
    expect(result.current.hasError).toBe(ErrorType.INVALID_COORDINATES);

    // Invalid input (invalid y-axis value)
    act(() => {
      result.current.handleChange("b3");
    });
    expect(result.current.hasError).toBe(ErrorType.INVALID_COORDINATES);

    // Invalid input (cell already fired)
    act(() => {
      result.current.handleChange("a2");
    });
    expect(result.current.hasError).toBe(ErrorType.CELL_ALREADY_FIRED);
  });

  it("Should handle form submission and trigger fire function", () => {
    const { result } = renderHook(() => useCoordinateForm());

    // Simulate input value change
    act(() => {
      result.current.handleChange("b2");
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
      result.current.handleChange("c1");
    });

    // Simulate form submission
    act(() => {
      result.current.handleSubmit({ preventDefault: jest.fn() } as any);
    });

    // Verify that the fire function is not called
    expect(mockFire).not.toHaveBeenCalled();
  });

  it("Should reset the form state", () => {
    const { result } = renderHook(() => useCoordinateForm());

    // Simulate input value change
    act(() => {
      result.current.handleChange("a1");
    });

    // Verify that the form state is updated
    expect(result.current.inputValue).toBe("a1");
    expect(result.current.hasError).toBe(false);

    // Call the reset function
    act(() => {
      result.current.reset();
    });

    // Verify that the form state is reset
    expect(result.current.inputValue).toBe("");
    expect(result.current.hasError).toBe(false);
  });
});
