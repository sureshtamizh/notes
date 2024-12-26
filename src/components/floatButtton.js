import { Image, Pressable, StyleSheet, View, Text } from 'react-native';
import React from 'react';
import Animated, {
    Easing,
    Extrapolation,
    interpolate,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

const FloatButtton = ({ navigations }) => {
    const firstValue = useSharedValue(10);
    const secondValue = useSharedValue(10);
    const isOpen = useSharedValue(false);
    const progress = useDerivedValue(() =>
        isOpen.value ? withTiming(1) : withTiming(0),
    );

    const handlePress = () => {
        const config = {
            easing: Easing.bezier(0.68, -0.6, 0.32, 1.6),
            duration: 500,
        };
        console.log(isOpen.value)
        if (isOpen.value) {
            firstValue.value = withTiming(30, config);
            secondValue.value = withDelay(50, withTiming(30, config));
        } else {
            firstValue.value = withDelay(200, withSpring(110));
            secondValue.value = withDelay(100, withSpring(180));
        }
        isOpen.value = !isOpen.value;
    };

    const firstIcon = useAnimatedStyle(() => {
        const scale = interpolate(
            firstValue.value,
            [30, 110],
            [0, 1],
            Extrapolation.CLAMP,
        );

        return {
            bottom: firstValue.value,
            transform: [{ scale: scale }],
        };
    });

    const secondIcon = useAnimatedStyle(() => {
        const scale = interpolate(
            secondValue.value,
            [30, 180],
            [0, 1],
            Extrapolation.CLAMP,
        );

        return {
            bottom: secondValue.value,
            transform: [{ scale: scale }],
        };
    });

    const handleFirstTextClick = (value) => {
        if (navigations) {
            isOpen.value = true;
            navigations(value); // Call the callback function passed as a prop
        }
    };

    const plusIcon = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${progress.value * 45}deg` }],
        };
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.contentContainer, secondIcon]}>
                <Pressable style={[styles.iconContainer, { width: 120 }]} onPress={() => handleFirstTextClick("checkBox")}>
                    <Text>Checkbox</Text>
                </Pressable>
            </Animated.View>
            <Animated.View style={[styles.contentContainer, firstIcon]} >
                <Pressable style={[styles.iconContainer, { width: 120 }]} onPress={() => handleFirstTextClick("textBox")}>
                    <Text>Text</Text>
                </Pressable>
            </Animated.View>
            <Pressable
                style={styles.contentContainer}
                onPress={() => {
                    handlePress();
                }}>
                <Animated.View style={[styles.iconContainer, plusIcon]}>
                    <Image
                        source={require('../../assets/plus.png')}
                        style={styles.icon}
                    />
                </Animated.View>
            </Pressable>
        </View>
    );
};

export default FloatButtton;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        backgroundColor: '#2c9ed6',
        position: 'absolute',
        bottom: 40, // Adjust this value to keep it closer to the bottom
        right: 20,  // Ensure it stays at the right
        borderRadius: 50,
        zIndex: 10,  // Ensure it is above other elements
    },
    iconContainer: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 17,
        height: 17,
    },
});
