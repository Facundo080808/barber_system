import { useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import { ClientesFlatList } from "../../src/components/ClientsFlatList";
import { ClientesContext } from "../../src/context/clientContext";


export default function ClientesScreen() {
  const context = useContext(ClientesContext);

  if (!context) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No se pudo cargar el contexto de clientes.</Text>
      </View>
    );
  }

  const { clientes, fetchClientes } = context;

  useEffect(() => {
    fetchClientes();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", color: "#333", marginBottom: 10 }}>
        Lista de Clientes 💈
      </Text>

      {clientes.length === 0 ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#007bff" />
          <Text style={{ marginTop: 10, color: "#666" }}>Cargando clientes...</Text>
        </View>
      ) : (
        <ClientesFlatList/>
      )}
      <TouchableOpacity
        style={{
          backgroundColor: "#007bff",
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
          marginTop: 20,
        }}
        onPress={() => {
          // Más adelante podés navegar a un formulario de "nuevo cliente"
      
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>+ Agregar Cliente</Text>
      </TouchableOpacity>

    </View>
  );
}
