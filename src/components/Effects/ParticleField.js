import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    withSequence,
    Easing,
    withDelay
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const COUNT = 25; // Keep low for performance

const Particle = ({ delay }) => {
    const translateY = useSharedValue(0);
    const opacity = useSharedValue(0);
    const scale = useSharedValue(Math.random() * 0.5 + 0.5);

    // Random start position
    const startX = Math.random() * width;
    const startY = Math.random() * height;

    useEffect(() => {
        // Float upwards
        translateY.value = withDelay(delay, withRepeat(
            withTiming(-200 - Math.random() * 200, { duration: 4000 + Math.random() * 3000, easing: Easing.linear }),
            -1,
            false
        ));

        // Fade in and out
        opacity.value = withDelay(delay, withRepeat(
            withSequence(
                withTiming(0.6, { duration: 1000 }),
                withTiming(0, { duration: 3000 })
            ),
            -1,
            true
        ));
    }, []);

    const animStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: startX },
            { translateY: startY + translateY.value },
            { scale: scale.value }
        ],
        opacity: opacity.value,
    }));

    return (
        <Animated.View
            style={[styles.particle, animStyle]}
        />
    );
};

export default function ParticleField() {
    return (
        <View style={styles.container} pointerEvents="none">
            {Array.from({ length: COUNT }).map((_, i) => (
                <Particle key={i} delay={Math.random() * 5000} />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
        zIndex: 1,
    },
    particle: {
        position: 'absolute',
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: 'rgba(0, 102, 255, 0.6)', // Blueprint color
        top: 0,
        left: 0,
    }
});
