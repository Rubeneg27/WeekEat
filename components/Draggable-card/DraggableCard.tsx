import React, { useRef } from 'react';
import { StyleSheet, Text, Animated, View, PanResponder } from 'react-native';

const DraggableCard = ({
    name,
    onDragStart,
    onDragMove,
    onDragEnd,
  }: {
    name: string;
    onDragStart: () => void;
    onDragMove: (pos: { x: number; y: number }) => void;
    onDragEnd: () => void;
  }) => {
    const pan = useRef(new Animated.ValueXY()).current;
  
    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
  
        onPanResponderGrant: () => {
          onDragStart();
        },
  
        onPanResponderMove: (evt, gestureState) => {
          onDragMove({ x: gestureState.moveX - 75, y: gestureState.moveY - 75 });
        },
  
        onPanResponderRelease: () => {
          onDragEnd();
        },
      })
    ).current;
  
    return (
      <View {...panResponder.panHandlers} style={styles.card}>
        <Text>{name}</Text>
      </View>
    );
  };

  const styles = StyleSheet.create({
    card: {
      backgroundColor: 'orange',
      width: 100,
      height: 100,
      marginTop: 50,
      marginHorizontal: 20
    }
  });

  export default DraggableCard;