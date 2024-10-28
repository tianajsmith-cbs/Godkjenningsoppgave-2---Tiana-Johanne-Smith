import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/HomeScreen';
import CountryCitySelectScreen from './screens/CountryCitySelectScreen';
import MapScreen from './screens/MapScreen';
import CameraScreen from './screens/CameraScreen';
import VisitedMachinesScreen from './screens/VisitedMachinesScreen'; 

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Hjem" component={HomeScreen} />
        <Tab.Screen name="Land" component={CountryCitySelectScreen} />
        <Tab.Screen name="Kart" component={MapScreen} />
        <Tab.Screen name="Kamera" component={CameraScreen} />
        <Tab.Screen name="Historikk" component={VisitedMachinesScreen} /> 
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
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
