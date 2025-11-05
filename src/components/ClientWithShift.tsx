import { View, Text } from "react-native";
import { ITurno } from "../../src/utils/types/types";

export const ClientWithShift = ({ item }: { item: ITurno }) => {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        marginVertical: 8,
        marginHorizontal: 8,
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
      <View>
        <Text style={{ color: "#555", fontSize: 16, marginBottom: 4 }}>
          📅 {item.dia} 
        </Text>
        <Text style={{ color: "#555", fontSize: 16 }}>
          ⏰ {item.hora}
        </Text>
      </View>
    </View>
  );
};
