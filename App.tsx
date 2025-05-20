import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button ,  StatusBarStyle, StatusBar, Modal, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AsyncStorage from '@react-native-async-storage/async-storage';

import WeekDays from './components/weekDays/WeekDays';
import Recipes from './components/Recipes/Recipes';
import Filters from './components/filters/Filters';
import { RecipeItem, Week } from './data/types';
import { fetchRecipes } from './data/recipes';
import { ScrollView } from 'react-native-gesture-handler';

export default function App() {
  const [recipes, setRecipes] = useState<RecipeItem[]>([]);
  const [selected, setSelected] = useState<RecipeItem | null>(null);
  const [assigned, setAssigned] = useState<Record<string,string>>({});
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);


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

  const openRecipeModal = (r: RecipeItem) => {
    console.log('Abriendo modal')
    setSelected(r)
    setModalVisible(true);
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
      <StatusBar
          backgroundColor="#61dafb"
      />
      <View style={styles.week_recipes_Container}>
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
          onOpenRecipeView={openRecipeModal}
        />
      </View>
      <Filters
        ingredientsFilters={activeFilters}
        onAddFilter={handleAddFilter}
      />
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Button title="Cerrar" onPress={() => setModalVisible(false)} />
            <View>
              {selected && (
                <View>
                  <Text style={styles.modalTitle}>{selected.name}</Text>
                  <Text style={styles.modalText}>Ingredientes:</Text>
                  {selected.ingredients.map((ing, idx) => (
                    <Text key={idx}>- {ing}</Text>
                  ))}
                  <ScrollView>
                    {selected.description}
                  </ScrollView>
                </View>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
    </GestureHandlerRootView>
    
  );
}

const styles = StyleSheet.create({
  week_recipes_Container: { flex:4, flexDirection:'row', padding:10,  justifyContent: 'space-between' },
  mainContainer: { flex: 1, flexDirection: 'column',},
  modalBackground: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.5)',
  justifyContent: 'center',
  alignItems: 'center',
},
modalContent: {
  backgroundColor: 'white',
  padding: 20,
  borderRadius: 10,
  width: '80%',
},
modalTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 10,
},
modalText: {
  fontSize: 16,
  marginBottom: 5,
}
});
