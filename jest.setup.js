import React from 'react';
import { View } from "react-native";


// Only mock necessary parts of the 'react-native-gesture-handler'
jest.mock('react-native-gesture-handler', () => {
    return {
        GestureHandlerRootView: View,
        PanGestureHandler: View,
        TapGestureHandler: View,
        Swipeable: View,
        DrawerLayout: View,
        BaseButton: View,
        RNGestureHandlerModule: {
            attachGestureHandler: jest.fn(),
            createGestureHandler: jest.fn(),
        },
        State: {
            BEGAN: 'BEGAN',
            FAILED: 'FAILED',
            ACTIVE: 'ACTIVE',
            END: 'END',
        },
        Directions: {},
    };
});

// Mocking Image AssetSourceResolver to handle image imports
jest.mock('react-native/Libraries/Image/AssetSourceResolver', () => ({
    getAssetSource: jest.fn(() => ({ uri: '' })),
}));
