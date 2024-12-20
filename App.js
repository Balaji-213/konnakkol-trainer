import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import TempoInputScreen from './screens/TempoInputScreen';
import PracticeModeScreen from './screens/PracticeModeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={TempoInputScreen} options={{ title: 'Konnakkol Trainer' }} />
          <Stack.Screen name="PracticeMode" component={PracticeModeScreen} options={{ title: 'Practice Mode' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
