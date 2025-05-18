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
      UIManager.measureInWindow(handle, (x, y, width, height) => {
        const layout = { x, y, width, height };
        console.log(`🗺️  Zona de drop para ${day}:`, layout);
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
    <View 
      ref={viewRef}
      style={styles.cardContainer}         // estilo CON height fijo y sin margin
      onLayout={() => measureLayout()}     // mide tras layout
    >
      <Text style={styles.cardText}>{day}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  cardContainer: {
    width: 220,
    height: 100,         // aquí el height que esperas
    backgroundColor: 'green',
  },
  cardText: {
    // sin width/height aquí
    textAlign: 'center',
    lineHeight: 100,    // centra verticalmente el texto
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default WeekDayCard;
