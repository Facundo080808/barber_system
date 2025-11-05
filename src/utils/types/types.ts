export interface ITurno {
  id_turno: string;
  hora: string;  
  dia: string;  
  Clientes?: ICliente;
}

export interface TurnosContextType {
  turnos: ITurno[];
  setTurnos: React.Dispatch<React.SetStateAction<ITurno[]>>;
  // fetchTurnos: (param: () => Promise<ITurno[]>) => Promise<void>;
}

export interface ICliente {
  id: string;
  nombre: string;
  celular: string;
  turnos?: ITurno[];
}

export interface ClientesContextType {
  clientes: ICliente[];
  setClientes: React.Dispatch<React.SetStateAction<ICliente[]>>;
  fetchClientes: () => Promise<void>;
}
