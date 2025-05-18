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
  
        onPanResponderMove: (evt, gesture) => {
          // moveX/Y ya son coordenadas de pantalla
          onDragMove({ x: gesture.moveX, y: gesture.moveY });
          pan.setValue({ x: gesture.dx, y: gesture.dy });
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
      margin: 10
    }
  });

  export default DraggableCard;