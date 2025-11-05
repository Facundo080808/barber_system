import { View, Text, TouchableOpacity, Alert } from "react-native";
import { ITurno } from "../../src/utils/types/types";
import { deleteTurnoApi } from "../../src/utils/api/ShiftActions";
import { useContext } from "react";
import { ShiftContext } from "../../src/context/shiftContext";

export const TurnoItem = ({item}:{item : ITurno}) => {
  
    const {setTurnos} = useContext(ShiftContext)!;
     const handleDelete = async (id_turno: ITurno["id_turno"]) => {
        Alert.alert(
          "Eliminar turno",
          "¿Seguro que querés eliminar este turno?",
          [
            { text: "Cancelar", style: "cancel" },
            {
              text: "Eliminar",
              style: "destructive",
              onPress: async () => {
                try {
                  await deleteTurnoApi(id_turno);
                  setTurnos((prev) => prev.filter((t) => t.id_turno !== id_turno));
                } catch (error) {
                  Alert.alert("Error", "No se pudo eliminar el turno.");
                }
              },
            },
          ]
        );
      };

  return (
    <View
      style={{
        backgroundColor: "#fff",
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        padding: 16,
        borderWidth: 1,
        borderColor: "#eee",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          
          
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#333" }}>
              💇 {item.Clientes?.nombre}
            </Text>
          
            <Text style={{ color: "#555", marginTop: 4 }}>
                📅 {item.dia?.trim() || "Sin fecha"}
            </Text>
            <Text style={{ color: "#555" }}>⏰ {item.hora}</Text>
        </View>

        {/* ✅ Solo mostrar el botón borrar si NO estás en /clients */}
        
          <TouchableOpacity
            onPress={() => handleDelete(item.id_turno)}
            style={{
              backgroundColor: "#ff4d4f",
              paddingVertical: 8,
              paddingHorizontal: 14,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>🗑️</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};
