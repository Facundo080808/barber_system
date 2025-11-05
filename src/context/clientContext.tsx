import { createContext, useEffect, useState } from "react";
import { getClientesApi } from "../utils/api/ClientsActions";
import { ICliente, ClientesContextType } from "../utils/types/types";

export const ClientesContext = createContext<ClientesContextType | undefined>(undefined);

export function ClientesProvider({ children }: { children: React.ReactNode }) {
  const [clientes, setClientes] = useState<ICliente[]>([]);

  const fetchClientes = async () => {
    try {
      const response = await getClientesApi();
      setClientes(response);

    } catch (error) {
      console.error("Error al obtener los clientes:", error);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  return (
    <ClientesContext.Provider value={{ clientes, setClientes, fetchClientes }}>
      {children}
    </ClientesContext.Provider>
  );
}
