import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Button } from 'react-native';
import { RecipeItem } from '../../data/types';
import styles from '../styles';

const weekDays = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];

type WeekDaysProps = {
  recipeSelected: RecipeItem | null;
  assigned: Record<string,string>;
  onAssignSlot: (dayIdx: number, slotIdx: number) => void;
  onClearWeek: () => void;   // callback para borrar la semana
  onSaveWeek: () => void;   // callback para guardar la semana
  onLoadWeeks: () => void;   // callback para guardar la semana
};

export default function WeekDays({
  recipeSelected,
  assigned,
  onAssignSlot,
  onClearWeek,
  onSaveWeek,
  onLoadWeeks
}: WeekDaysProps) {
  return (
    <View style={styles.flexDouble}>
      {/* <View style={[localStyles.buttons_container]}>
        <TouchableOpacity
          onPress={onClearWeek}
          accessibilityLabel="Borrar todas las asignaciones de la semana"
          style={[styles.bgRed, styles.buttonUI, styles.shadow_hard]}
        >
          <Text>Borrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onSaveWeek}
          accessibilityLabel="Almacenar semana en memoria"
          style={[styles.bg_scd_lightest_color, styles.buttonUI, styles.shadow_hard]}
        >
          <Text>Guardar</Text>
        </TouchableOpacity>
      </View> */}
      <ScrollView style={[]}>
        {weekDays.map((day, dIdx) => (
          <View key={dIdx} style={[styles.dayCard, styles.bg_prmy_light_color, styles.shadow_hard]}>
            <Text style={[styles.dayTitle]}>{day}</Text>
            {[0,1].map(sIdx => {
              const key = `${dIdx}-${sIdx}`;
              return (
                <TouchableOpacity
                  key={sIdx}
                  style={[
                    styles.daySlot,
                    styles.shadow_thin,
                    recipeSelected && styles.daySlotActive
                  ]}
                  onPress={() => onAssignSlot(dIdx, sIdx)}
                >
                  <Text>
                    {assigned[key] || `Slot ${sIdx+1}`}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const localStyles = StyleSheet.create({
  buttons_container: { 
    padding: 2,
    height: 55,
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-around',
  }
});
