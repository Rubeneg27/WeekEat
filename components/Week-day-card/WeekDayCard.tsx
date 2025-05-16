import React, { JSX, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type WeekDayCardProps = {
  day: string;
};

export default function WeekDayCard({ day }: WeekDayCardProps): JSX.Element {
  return (
    <View>
      <Text style={styles.card}>{day}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
    card: {
        width: 220,
        height: 300,
        backgroundColor: 'green',
        margin: 10
    }
  });