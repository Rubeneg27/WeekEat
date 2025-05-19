import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button ,  StatusBarStyle, StatusBar } from 'react-native';
import WeekDays from './components/weekDays/WeekDays';
import Recipes from './components/Recipes/Recipes';
import Filters from './components/filters/Filters';
import { RecipeItem } from './data/types';
import { fetchRecipes } from './data/recipes';

export default function App() {
  const [recipes, setRecipes] = useState<RecipeItem[]>([]);
  const [selected, setSelected] = useState<RecipeItem | null>(null);
  const [assigned, setAssigned] = useState<Record<string,string>>({});
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  useEffect(()=>{
    fetchRecipes().then((data)=>(setRecipes(data)))
  },[])

  const onSelectRecipe = (r: RecipeItem) => setSelected(r);

  const onAssignSlot = (dayIdx: number, slotIdx: number) => {
    if (!selected) return;
    const key = `${dayIdx}-${slotIdx}`;
    setAssigned(prev => ({ ...prev, [key]: selected.name }));
    setSelected(null);
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
