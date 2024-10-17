import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Notes from './src/screens/notes';
import NotesDetails from './src/screens/notedtls';


// Create the stack navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 22, // Custom font size for the title
            color: '#000', // Title color
          },
          headerTitleAlign: 'center', // Center the title
          ...TransitionPresets.SlideFromRightIOS, // Small slide animation for screen transition
        }}
      >
        <Stack.Screen name="notes" options={{ title: 'Notes', headerTitleAlign: 'center' }} component={Notes} />
        <Stack.Screen name="noteDtls" options={{ title: '', headerTitleAlign: 'center' }} component={NotesDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
