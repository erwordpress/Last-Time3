import React, { useRef, useState } from 'react';
import { Text, Pressable, Animated, Platform } from 'react-native';
import { colors, utilities } from '../../theme/designSystem';

export default function NeonButton({ 
  onPress, 
  style, 
  text, 
  variant = 'filled', 
  mobile = false,
  fontSize,
  ...props 
}) {
  const glow = useRef(new Animated.Value(0)).current;
  const [isHovered, setIsHovered] = useState(false);

  const handlePressIn = () => {
    setIsHovered(true);
    Animated.timing(glow, { toValue: 1, duration: 150, useNativeDriver: false }).start();
  };

  const handlePressOut = () => {
    setIsHovered(false);
    Animated.timing(glow, { toValue: 0, duration: 200, useNativeDriver: false }).start();
  };

  const baseStyle = variant === 'filled' ? utilities.blueprintButton : utilities.neonOutlineButton;
  const glowShadow = glow.interpolate({
    inputRange: [0, 1],
    outputRange: variant === 'filled' 
      ? ['0 0 10px rgba(0,102,255,0.3)', '0 0 20px rgba(0,240,255,0.8), 0 0 30px rgba(0,240,255,0.5), 0 0 40px rgba(0,240,255,0.3)']
      : ['0 0 10px rgba(0,240,255,0.3)', '0 0 20px rgba(0,240,255,0.8), 0 0 30px rgba(0,240,255,0.5)'],
  });

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onHoverIn={handlePressIn}
      onHoverOut={handlePressOut}
      style={[
        baseStyle,
        style,
        Platform.OS === 'web' && {
          boxShadow: glowShadow,
        },
      ]}
      {...props}
    >
      <Text style={{ 
        color: variant === 'filled' ? colors.white : colors.neonCyan, 
        fontWeight: '700', 
        fontSize: fontSize || (mobile ? 12 : 14),
        ...(Platform.OS === 'web' && {
          textShadow: isHovered 
            ? `0 0 10px ${colors.neonCyan}, 0 0 20px ${colors.neonCyan}`
            : `0 0 5px ${colors.neonCyan}`,
        }),
      }}>
        {text}
      </Text>
    </Pressable>
  );
}



