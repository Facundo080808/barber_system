import { supabase } from "../../services/supabase";
import { ITurno } from "../types/types";

export const getTurnosApi = async (): Promise<ITurno[]> => {
  const { data, error } = await supabase
    .from("turnos")
    .select("id_turno, hora, dia, Clientes:id_Cliente (id,nombre,celular)")
    .order("dia", { ascending: false })
    .order("hora", { ascending: true });

  if (error) throw error;
  if (!data) return [];

  return data.map(turno => ({
    ...turno,
    Clientes: Array.isArray(turno.Clientes)
      ? turno.Clientes[0]
      : turno.Clientes,
  }));
};

export const getTurnosHoyApi = async (): Promise<ITurno[]> => {
  const hoy = new Date();
  const fechaHoy = hoy.toISOString().split("T")[0];
  const horaActual = hoy.toTimeString().slice(0, 8);

  const { data, error } = await supabase
    .from("turnos")
    .select(`
      id_turno,
      dia,
      hora,
      Clientes (
        id,
        nombre,
        celular
      )
    `)
    .gte("dia", fechaHoy)
    .order("dia", { ascending: true })
    .order("hora", { ascending: true });

  if (error) {
    console.error("Error al obtener los turnos:", error);
    throw error;
  }

  if (!data) return [];

  const turnosNormalizados = data.map((turno) => ({
    ...turno,
    Clientes: Array.isArray(turno.Clientes)
      ? turno.Clientes[0]
      : turno.Clientes,
  }));

  const turnosFiltrados = turnosNormalizados.filter((turno) => {
    if (turno.dia > fechaHoy) return true;
    if (turno.dia === fechaHoy && turno.hora >= horaActual) return true;
    return false;
  });

  turnosFiltrados.sort((a, b) => {
    const fechaA = new Date(`${a.dia}T${a.hora}`);
    const fechaB = new Date(`${b.dia}T${b.hora}`);
    return fechaA.getTime() - fechaB.getTime(); 
  });

  return turnosFiltrados;
};



export const createTurnoApi = async (nuevoTurno: Omit<ITurno, "id_turno">) => {
  const { data, error } = await supabase
    .from("turnos")
    .insert([
      {
        hora: nuevoTurno.hora,
        dia: nuevoTurno.dia,
      },
    ])
    .select();

  if (error) {
    console.error("Error al crear el turno:", error);
    throw error;
  }

  return data?.[0];
};

export const updateTurnoApi = async (id_turno: string, datosActualizados: Partial<ITurno>) => {
  const { data, error } = await supabase
    .from("turnos")
    .update({
      hora: datosActualizados.hora,
      dia: datosActualizados.dia,
    })
    .eq("id_turno", id_turno)
    .select();

  if (error) {
    console.error("Error al actualizar el turno:", error);
    throw error;
  }

  return data?.[0];
};

export const deleteTurnoApi = async (id_turno:ITurno["id_turno"] ) => {
  const { error } = await supabase
    .from("turnos")
    .delete()
    .eq("id_turno", id_turno);

  if (error) {
    console.error("Error al eliminar el turno:", error);
    throw error;
  }

  return true;
};