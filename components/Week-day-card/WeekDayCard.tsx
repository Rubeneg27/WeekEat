import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { View, Text, StyleSheet, findNodeHandle, UIManager } from 'react-native';

type Layout = { x: number; y: number; width: number; height: number };
type WeekDayCardProps = {
  day: string;
  registerDropZone: (day: string, layout: Layout) => void;
};

const WeekDayCard = forwardRef(({ day, registerDropZone }: WeekDayCardProps, ref) => {
  const viewRef = useRef<View>(null);

  // Función para medir el layout y registrar la zona
  const measureLayout = () => {
    const handle = findNodeHandle(viewRef.current);
    if (handle) {
      UIManager.measure(handle, (_x, _y, width, height, pageX, pageY) => {
        const layout = { x: pageX, y: pageY, width, height };
        registerDropZone(day, layout);
      });
    }
  };

  // Medir al montar
  useEffect(() => {
    setTimeout(() => {
      measureLayout();
    }, 0);
  }, []);

  // Exponer la función measureLayout al padre
  useImperativeHandle(ref, () => ({
    measureLayout,
  }));

  return (
    <View ref={viewRef}>
      <Text style={styles.card}>{day}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    width: 220,
    height: 300,
    backgroundColor: 'green',
    margin: 10,
  },
});

export default WeekDayCard;
