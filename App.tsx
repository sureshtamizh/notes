import React from "react";
import ProfileScreen from "./src/screens/ProfileScreen";

// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";



// const NoteDetails = React.lazy(() => import('./src/screens/NotesDetails'))

// const Stack = createStackNavigator()

const App = () => {
    return (
        <ProfileScreen />
        // <NavigationContainer>
        //     <Stack.Navigator screenOptions={{ ...TransitionPresets.SlideFromRightIOS, keyboardHandlingEnabled: true }}>
        //         <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        //         <Stack.Screen name="NoteDetails" component={NoteDetails} />
        //     </Stack.Navigator>
        // </NavigationContainer>
    )
}

export default App