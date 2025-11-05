import { useEffect, useState, useContext } from "react";
import { ShiftContext } from "../src/context/shiftContext";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import { getTurnosHoyApi } from "../src/utils/api/ShiftActions"; 

export default function App() {
  const {turnos, setTurnos} = useContext(ShiftContext)!;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        setLoading(true);
        const data = await getTurnosHoyApi();
        setTurnos(data);
      } catch (err) {
        console.error("Error al cargar los turnos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTurnos();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", color: "#333", marginBottom: 10 }}>
        Turnos desde hoy 💈
      </Text>

      {loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#007bff" />
          <Text style={{ marginTop: 10, color: "#666" }}>Cargando turnos...</Text>
        </View>
      ) : turnos.length === 0 ? (
        <Text style={{ textAlign: "center", color: "#666", marginTop: 20 }}>
          No hay turnos próximos.
        </Text>
      ) : (
        <FlatList
          data={turnos}
          keyExtractor={(item) => item.id_turno.toString()}
          renderItem={({ item }) => {
            const cliente =
              Array.isArray(item.Clientes) && item.Clientes.length > 0
                ? item.Clientes[0]
                : item.Clientes;

            return (
              <View
                style={{
                  backgroundColor: "#f9f9f9",
                  padding: 15,
                  marginVertical: 6,
                  borderRadius: 10,
                  shadowColor: "#000",
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 2,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "bold", color: "#222" }}>
                  💇 {cliente?.nombre ?? "Cliente desconocido"}
                </Text>
                <Text style={{ color: "#555", marginTop: 4 }}>📅 {item.dia}</Text>
                <Text style={{ color: "#555" }}>⏰ {item.hora}</Text>
                {cliente?.celular && (
                  <Text style={{ color: "#555" }}>📞 {cliente.celular}</Text>
                )}
              </View>
            );
          }}
        />
      )}
    </View>
  );
}
