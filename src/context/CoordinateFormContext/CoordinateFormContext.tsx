import React, { createContext, useContext } from "react";
import type { CoordinateForm } from "../../hooks/useCoordinateForm";
import { useCoordinateForm } from "../../hooks/useCoordinateForm";

// Create the CoordinateForm context
const CoordinateFormContext = createContext<CoordinateForm | null>(null);

// Create the CoordinateForm provider component
export const CoordinateFormProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  // Use the useCoordinateForm hook to generate the coordinate form values and manage its state
  const coordinateForm = useCoordinateForm();

  return (
    <CoordinateFormContext.Provider value={coordinateForm}>
      {children}
    </CoordinateFormContext.Provider>
  );
};

// Custom hook to access the CoordinateForm context
export const useCoordinateFormContext = () => {
  const context = useContext(CoordinateFormContext);
  if (!context) {
    throw new Error(
      "useCoordinateFormContext must be used within a CoordinateFormProvider"
    );
  }
  return context;
};
