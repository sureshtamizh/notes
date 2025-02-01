import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TransitionPresets } from "@react-navigation/stack";



import Home from "./src/screens/Home";
import Splash from "./src/screens/Splash";


const NoteDetails = React.lazy(() => import('./src/screens/NotesDetails'))

const Stack = createStackNavigator()

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ ...TransitionPresets.SlideFromRightIOS, keyboardHandlingEnabled: true }}>
                {/* <Stack.Screen name="splash" component={Splash}></Stack.Screen> */}
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="NoteDetails" component={NoteDetails} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App