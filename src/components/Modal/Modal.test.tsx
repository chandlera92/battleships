import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Modal } from "./Modal";

// Mock ReactDOM.createPortal
jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  createPortal: (node: React.ReactNode) => node,
}));

describe("Modal", () => {
  let modalRoot: HTMLElement | null;

  beforeEach(() => {
    modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modalRoot");
    document.body.appendChild(modalRoot);
  });

  afterEach(() => {
    if (modalRoot) {
      document.body.removeChild(modalRoot);
      modalRoot = null;
    }
    cleanup();
  });

  it("Should render modal when isOpen is true", () => {
    render(
      <Modal isOpen={true} title="Test Modal">
        Modal Content
      </Modal>
    );

    const modalOverlay = screen.getByTestId("modalOverlay");
    const modal = screen.getByTestId("modal");

    expect(modalOverlay).toBeInTheDocument();
    expect(modal).toBeInTheDocument();
  });

  it("Should not render modal when isOpen is false", () => {
    render(
      <Modal isOpen={false} title="Test Modal">
        Modal Content
      </Modal>
    );

    const modalOverlay = screen.queryByTestId("modalOverlay");
    const modal = screen.queryByTestId("modal");

    expect(modalOverlay).toBeNull();
    expect(modal).toBeNull();
  });

  it("Should render modal with title", () => {
    render(
      <Modal isOpen={true} title="Test Modal">
        Modal Content
      </Modal>
    );

    const modalHeader = screen.getByTestId("modalHeader");

    expect(modalHeader).toHaveTextContent("Test Modal");
  });

  it("Should render modal with content", () => {
    render(
      <Modal isOpen={true} title="Test Modal">
        Modal Content
      </Modal>
    );

    const modalContent = screen.getByTestId("modalContent");

    expect(modalContent).toHaveTextContent("Modal Content");
  });

  it("Should call onClick when primary action button is clicked", () => {
    const handleClick = jest.fn();
    render(
      <Modal
        isOpen={true}
        title="Test Modal"
        primaryAction={{ label: "Action", onClick: handleClick }}
      >
        Modal Content
      </Modal>
    );

    const modalActionPrimary = screen.getByTestId("modalActionPrimary");
    act(() => {
      modalActionPrimary.click();
    });

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
