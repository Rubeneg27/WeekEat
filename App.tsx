import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button ,  StatusBarStyle, StatusBar } from 'react-native';
import { supabase } from './supaBaseClient';
import WeekDays from './components/weekDays/WeekDays';
import Recipes, { RecipeItem } from './components/Recipes/Recipes';
import Filters from './components/filters/Filters';

export default function App() {
  const [recipes, setRecipes] = useState<RecipeItem[]>([]);
  const [selected, setSelected] = useState<RecipeItem | null>(null);
  const [assigned, setAssigned] = useState<Record<string,string>>({});

  useEffect(() => {
    supabase.from('food').select('*')
      .then(({ data, error }) => {
        if (!error) setRecipes(data as RecipeItem[]);
      });
  }, []);

  const onSelectRecipe = (r: RecipeItem) => setSelected(r);

  const onAssignSlot = (dayIdx: number, slotIdx: number) => {
    if (!selected) return;
    const key = `${dayIdx}-${slotIdx}`;
    setAssigned(prev => ({ ...prev, [key]: selected.name }));
    setSelected(null);
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
        />
        <Recipes
          recipes={recipes}
          selectedRecipe={selected}
          onSelectRecipe={onSelectRecipe}
        />
      </View>
      <Filters></Filters>
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: { flex:4, flexDirection:'row', padding:10 },
  mainContainer: { flex: 1, flexDirection: 'column'},
});
