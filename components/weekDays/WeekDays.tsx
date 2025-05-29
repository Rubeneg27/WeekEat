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
    <View style={localStyles.week_section_container}>
      <View style={localStyles.buttons_container}>
        <TouchableOpacity
          onPress={onClearWeek}
          accessibilityLabel="Borrar todas las asignaciones de la semana"
          style={[styles.bgRed, styles.padding5]}
        >
          <Text>Borrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onSaveWeek}
          accessibilityLabel="Almacenar semana en memoria"
          style={[styles.bg_scd_light_color, styles.padding5]}
        >
          <Text>Guardar</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={localStyles.days_container}>
        {weekDays.map((day, dIdx) => (
          <View key={dIdx} style={[localStyles.dayCard, styles.bg_prmy_light_color]}>
            <Text style={[localStyles.dayTitle]}>{day}</Text>
            {[0,1].map(sIdx => {
              const key = `${dIdx}-${sIdx}`;
              return (
                <TouchableOpacity
                  key={sIdx}
                  style={[
                    localStyles.slot,
                    styles.shadow_thin,
                    recipeSelected && localStyles.slotActive
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
  week_section_container: {
    flex: 1.5,
  },
  days_container: { flex: 1 },
  dayCard: { 
    margin: 10, 
    padding: 5,
    borderRadius:6 
  },
  dayTitle: { fontWeight:'bold', marginBottom:4 },
  slot: {
    height: 40, marginVertical:4, backgroundColor:'#fc9', borderRadius:4,
    justifyContent:'center', alignItems:'center'
  },
  slotActive: { borderWidth:2, borderColor:'blue' },
  buttons_container: { 
    padding: 2,
    height: 55,
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-around',
  }
});
