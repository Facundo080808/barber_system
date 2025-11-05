import React, { useEffect, useState , useContext} from "react";
import { View, Text, FlatList, Alert, ActivityIndicator } from "react-native";
import { getTurnosApi } from "../../src/utils/api/ShiftActions";
import { ShiftContext } from "../../src/context/shiftContext";
import { TurnoItem } from "../../src/components/TurnoItem";

export default function ShiftsScreen() {
  const {turnos, setTurnos} = useContext(ShiftContext)!;
  const [loading, setLoading] = useState(true);
  const fetchTurnos = async () => {
    try {
      setLoading(true);
      const data = await getTurnosApi();
      setTurnos(data);
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los turnos.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

 

  useEffect(() => {
    fetchTurnos();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5", paddingTop: 30 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 10,
          color: "#333",
        }}
      >
        Historial de Turnos
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 40 }} />
      ) : turnos.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 40, color: "#666" }}>
          No hay turnos próximos 📅
        </Text>
      ) : (
        <FlatList
          data={turnos}
          keyExtractor={(item) => item.id_turno.toString()}
           renderItem={({ item }) => <TurnoItem item={item} />}
          contentContainerStyle={{ paddingBottom: 20 }}
          onRefresh={fetchTurnos}
          refreshing={loading}
        />
      )}
    </View>
  );
}
