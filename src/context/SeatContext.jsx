import { createContext, useState } from "react";

export const SeatContext = createContext();

export function SeatProvider({ children }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [boardingPoint, setBoardingPoint] = useState("");
  const [droppingPoint, setDroppingPoint] = useState("");


  return (
    <SeatContext.Provider value={{
      selectedSeats,
      setSelectedSeats,
      selectedBus,
      setSelectedBus,
      boardingPoint,
      setBoardingPoint,
      droppingPoint,
      setDroppingPoint,
    }}>
      {children}
    </SeatContext.Provider>
  );
}