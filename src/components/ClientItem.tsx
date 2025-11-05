import { ICliente, ITurno } from "../utils/types/types";
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
 
  FlatList,
} from "react-native";
import { useState } from "react";
import { TurnoItem } from "./TurnoItem";
import { ClientWithShift } from "./ClientWithShift";



export function ClientItem({ nombre, celular, turnos }: ICliente) {
  const cantidadTurnos = turnos?.length || 0;
  const [expandido, setExpandido] = useState(false);

  const getColor = () => {
    if (cantidadTurnos >= 5) return "#007bff";
    if (cantidadTurnos >= 3) return "#4CAF50";
    if (cantidadTurnos >= 1) return "#f0ad4e";
    return "#ccc";
  };

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandido(!expandido);
  };

  return (
    <View
      style={{
        backgroundColor: "#fff",
        padding: 15,
        marginVertical: 6,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      }}
    >
      <TouchableOpacity
        onPress={toggleExpand}
        activeOpacity={0.7}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#222" }}>
            {nombre}
          </Text>
          <Text style={{ color: "#555", marginTop: 3 }}>{celular}</Text>
        </View>

        <View
          style={{
            backgroundColor: getColor(),
            paddingVertical: 10,
            paddingHorizontal: 16,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            minWidth: 70,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            ✂️ {cantidadTurnos}
          </Text>
        </View>
      </TouchableOpacity>

      {expandido && cantidadTurnos > 0 && (
        <View
          style={{
            marginTop: 12,
            paddingTop: 10,
            borderTopWidth: 1,
            borderTopColor: "#eee",
          }}
        >
          <FlatList
            data={turnos}
             renderItem={({ item }) => <ClientWithShift item={item} /> }
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false} 
          />
        </View>
      )}

      {expandido && cantidadTurnos === 0 && (
        <Text style={{ color: "#888", marginTop: 10, textAlign: "center" }}>
          No tiene turnos registrados.
        </Text>
      )}
    </View>
  );
}
