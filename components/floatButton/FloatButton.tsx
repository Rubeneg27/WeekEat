import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import styles from '../styles';

type FloatButtonProps = {
  onPressFunc: () => void;
}

export default function FloatButton ({ onPressFunc }: FloatButtonProps) {

  return (
    <View style={[localSyles.floatContainer]}>
      <TouchableOpacity 
      style={[styles.buttonUI, styles.bg_scd_lightest_color, styles.shadow_hard,styles.marginR10]}
      onPress={()=>onPressFunc()}
      />
            <TouchableOpacity 
      style={[styles.buttonUI, styles.bg_scd_lightest_color, styles.shadow_hard,styles.marginR10 ]}
      onPress={()=>onPressFunc()}
      />
            <TouchableOpacity 
      style={[styles.buttonUI, styles.bg_scd_lightest_color, styles.shadow_hard, styles.marginR10]}
      onPress={()=>onPressFunc()}
      />
    </View>
  )
}

const localSyles = StyleSheet.create({
  floatContainer: {
    flexDirection: 'row',
    right: 0,
    bottom: 10,
    position: 'absolute',
    height: 60,
  }
})