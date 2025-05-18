import 'react-native-gesture-handler';     // ← ¡PRIMERO!
import { registerRootComponent } from 'expo'; // o react-native
import App from './App'                     // tu App

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
