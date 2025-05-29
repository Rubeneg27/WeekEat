import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, } from 'react-native';
import styles from '../styles';

type FloatButtonProps = {
  onPressFunc: () => void;
}

export default function FloatButton ({ onPressFunc }: FloatButtonProps) {

  return (
    <TouchableOpacity 
      style={[styles.float_button, styles.bg_scd_light_color]}
      onPress={()=>onPressFunc()}
    />
  )
}