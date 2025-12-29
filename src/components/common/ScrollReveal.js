import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withDelay, interpolate, Extrapolation } from 'react-native-reanimated';
import { useWindowDimensions } from 'react-native';

// Simple scroll reveal component
// Note: For a true scroll-aware reveal in a ScrollView, we usually need the scroll position.
// However, a simpler "mount" animation works well for initial load or we can use Intersection Observer on web.
// For React Native, without complex measurements, we'll implement a staggered mount animation 
// or simpler "fade in when mounted" if the list is virtualized.

// Ideally, we pass the scroll shared value to this component, but for simplicity in this specific codebase
// where we might not want to refactor the entire ScrollView into an Animated.ScrollView just yet, 
// we will start with a "FadeInUp" generic animation that triggers on mount. 
// If the user wants true scroll-triggering, we can upgrade to Animated.ScrollView + measure.

export default function ScrollReveal({ children, delay = 0, duration = 600, style }) {
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(40);

    useEffect(() => {
        opacity.value = withDelay(delay, withTiming(1, { duration }));
        translateY.value = withDelay(delay, withTiming(0, { duration }));
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translateY.value }],
    }));

    return (
        <Animated.View style={[style, animatedStyle]}>
            {children}
        </Animated.View>
    );
}
