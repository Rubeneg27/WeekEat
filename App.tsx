import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button ,  StatusBarStyle, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import WeekDays from './components/weekDays/WeekDays';
import Recipes from './components/Recipes/Recipes';
import Filters from './components/filters/Filters';
import { RecipeItem, Week } from './data/types';
import { fetchRecipes } from './data/recipes';

export default function App() {
  const [recipes, setRecipes] = useState<RecipeItem[]>([]);
  const [selected, setSelected] = useState<RecipeItem | null>(null);
  const [assigned, setAssigned] = useState<Record<string,string>>({});
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  useEffect(()=>{
    loadWeek();
    fetchRecipes().then((data)=>(setRecipes(data)))
  },[])

  const onSelectRecipe = (r: RecipeItem) => setSelected(r);

  const onAssignSlot = (dayIdx: number, slotIdx: number) => {
    if (!selected) return;
    const key = `${dayIdx}-${slotIdx}`;
    setAssigned(prev => ({ ...prev, [key]: selected.name }));
    setSelected(null);
  };

  const storageWeek = async () => {
    try {
      const jsonValue = JSON.stringify(assigned);
      await AsyncStorage.setItem('@week_data', jsonValue);
      console.log('Semana guardada' + jsonValue);
    } catch (e) {
      console.error('Error al guardar semana:', e);
    }
  };

  const loadWeek = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@week_data');
      if (jsonValue !== null) {
        const data = JSON.parse(jsonValue);
        setAssigned(data);
        console.log('Semana cargada' + data);
      } else {
        console.log('No hay semana guardada');
      }
    } catch (e) {
      console.error('Error al cargar semana:', e);
    }
  };

  const handleAddFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter) // si está, lo quitamos
        : [...prev, filter]                // si no está, lo agregamos
    );
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar
          backgroundColor="#61dafb"
      />
      <View style={styles.container}>
        <WeekDays
          recipeSelected={selected}
          assigned={assigned}
          onAssignSlot={onAssignSlot}
          onClearWeek={() => setAssigned({})} 
          onSaveWeek={storageWeek}
          onLoadWeeks={loadWeek}
        />
        <Recipes
          recipes={recipes}
          selectedRecipe={selected}
          onSelectRecipe={onSelectRecipe}
          activeFilters={activeFilters}
        />
      </View>
      <Filters
        ingredientsFilters={activeFilters}
        onAddFilter={handleAddFilter}
      />
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: { flex:4, flexDirection:'row', padding:10 },
  mainContainer: { flex: 1, flexDirection: 'column'},
});
