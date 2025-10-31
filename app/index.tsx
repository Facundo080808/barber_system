import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function App() {
   return (
    <View style={{backgroundColor: '#fff', flex: 2, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{color:'blue'}}>Bienvenido a la barbería</Text>
      <Link href="/shifts" style={{ marginTop: 20, color: 'blue' }}>
        Ir a Turnos
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
