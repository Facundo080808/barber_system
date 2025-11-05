import { createContext, useEffect, useState } from "react";
import { ITurno, TurnosContextType } from "../utils/types/types";

export const ShiftContext = createContext<TurnosContextType >({
  turnos: [],
  setTurnos: () => {}
});

export function TurnosProvider({ children }: { children: React.ReactNode }) {
  const [turnos, setTurnos] = useState<ITurno[]>([]);

  // const fetchTurnos = async (param: () => Promise<ITurno[]>) => {
  //   try {
  //     const response = await param();
  //     setTurnos(response);
  //   } catch (error) {
  //     console.error("Error al obtener los turnos:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchTurnos(getTurnosApi);
  // }, []);

  return (
    <ShiftContext.Provider value={{ turnos, setTurnos }}>
      {children}
    </ShiftContext.Provider>
  );
}
