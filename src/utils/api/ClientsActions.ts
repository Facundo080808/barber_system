import { supabase } from "../../services/supabase";
import { ICliente } from "../types/types";

export const getClientesApi = async (): Promise<ICliente[]> => {
  const { data, error } = await supabase
    .from("Clientes")
    .select("id, nombre, celular,turnos (id_turno,dia,hora)")
    .order("nombre", { ascending: true });

  if (error) {
    console.error("Error al obtener los clientes:", error);
    throw error;
  }

  return data || [];
};
