import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import "./Modal.scss";

type ModalProps = {
  isOpen: boolean;
  title?: string;
  children: ReactNode;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  children,
  primaryAction,
}) => {
  // If the modal is not open, don't render anything
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div data-testid="modalOverlay" className="modalOverlay">
      <div data-testid="modal" className="modal">
        {title && (
          <div data-testid="modalHeader" className="modalHeader">
            {title}
          </div>
        )}
        <div data-testid="modalContent" className="modalContent">
          {children}
        </div>
        {primaryAction && (
          <div className="modalActions">
            <button
              data-testid="modalActionPrimary"
              className="modalActionPrimary"
              onClick={primaryAction.onClick}
            >
              {primaryAction.label}
            </button>
          </div>
        )}
      </div>
    </div>,
    // Specify the DOM element to render the portal into
    document.getElementById("modalRoot") as Element | DocumentFragment
  );
};
