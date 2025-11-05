import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { ClientesContext } from "../context/clientContext";
import { useContext } from "react";
import { ClientItem } from "./ClientItem";

export function ClientesFlatList() {
    const { clientes } = useContext(ClientesContext)!;
    return (
        <FlatList
          data={clientes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ClientItem {...item} />
          )}
        />
    )
}