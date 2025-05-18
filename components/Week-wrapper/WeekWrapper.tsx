import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import WeekDayCard from '../Week-day-card/WeekDayCard';

const weekDays: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const WeekWrapper = forwardRef(({  }) => {

  return (
    <ScrollView horizontal style={styles.wrapper}>
      {weekDays.map((day, index) => (
        <WeekDayCard
          key={day}
          day={day}
        />
      ))}
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    // backgroundColor: 'grey',
    // height: 10,
    // width: '100%',
  },
});

export { weekDays };
export default WeekWrapper;
