import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { View, Text, StyleSheet, findNodeHandle, UIManager } from 'react-native';

type Layout = { x: number; y: number; width: number; height: number };
type WeekDayCardProps = {
  day: string;
};

const WeekDayCard = forwardRef(({ day }: WeekDayCardProps, ref) => {
  const viewRef = useRef<View>(null);

  return (
    <View 
      ref={viewRef}
      style={styles.cardContainer}
    >
      <Text>{day}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  cardContainer: {
    flex:1,
    width: 220,      // aquí el height que esperas
    backgroundColor: 'green',
  }
});

export default WeekDayCard;
