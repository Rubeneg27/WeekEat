import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Foods from './components/Foods/Foods'
import WeekWrapper from './components/Week-wrapper/WeekWrapper';
import Filters from './components/filters/Filters';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Semana</Text>
      <WeekWrapper></WeekWrapper>
      <Text style={styles.title}>Filtros</Text>
      <Filters></Filters>
      <Text style={styles.title}>Recetas</Text>
      <Foods></Foods>
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
    title: {
      paddingTop: 30,
    }
});
