// components/recipes/Recipes.tsx

import React, { useEffect, useState, useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Button } from 'react-native';
import { RecipeItem } from '../../data/types';

type RecipesProps = {
  recipes: RecipeItem[];
  selectedRecipe: RecipeItem | null;
  activeFilters: string[];   
  onSelectRecipe: (recipe: RecipeItem) => void;
  onOpenRecipeView: (recipe: RecipeItem) => void;
};

export default function Recipes({ 
  recipes,
  selectedRecipe,
  onSelectRecipe, 
  activeFilters,
  onOpenRecipeView
  }: RecipesProps) {

  /** Filtra las recetas:
   *  – Mantiene la receta si AL MENOS UNO de los filtros activos
   *    aparece (ignorando mayúsculas/minúsculas) en su lista de ingredientes.
   *  – Si activeFilters está vacío → muestra todas.
   */
const filteredRecipes = useMemo(() => {
  if (activeFilters.length === 0) return recipes;

  return recipes.filter((recipe) => {
    const ingredientsLower = recipe.ingredients.map(i => i.toLowerCase());
    const categoriesLower = recipe.Category.map(i => i.toLowerCase());

    return activeFilters.some(filter => {
      const f = filter.toLowerCase();
      return ingredientsLower.includes(f) || categoriesLower.includes(f);
    });
  });
}, [recipes, activeFilters]);

  const onAddNewRecipe = () => {
    console.log("Añadiendo receta nueva")
  }

  return (
    <View style={styles.recipes_section_container}>
      <View style={styles.addRecipe_button_container}>
        <Button 
            onPress={onAddNewRecipe}
            title="Añadir receta"
            color="green"
            accessibilityLabel="Borrar todas las asignaciones de la semana"
        />
      </View>
      <ScrollView style={styles.recipes_container}>
        {filteredRecipes.map(r => (
          <TouchableOpacity
            key={r.id}
            style={[
              styles.recipeCard,
              selectedRecipe?.id === r.id && styles.recipeSelected
            ]}
            onPress={() => onSelectRecipe(r)}
          >
            <Text style={styles.recipeText}>{r.name}</Text>
            <View style={styles.view_button_cont}>
              <Button 
                onPress={() => onOpenRecipeView(r)}
                title="Ver"
                color="grey"
                accessibilityLabel="Abrir detalles de la receta"
              />
            </View>

          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  recipes_section_container: { 
    flex: 1,
    backgroundColor: 'white'
  },
  recipes_container: { flex: 1 },
  recipeCard: {
    height: 130,
    margin: 10, 
    padding: 5, 
    backgroundColor: '#9f9',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recipeSelected: {
    borderWidth: 2,
    borderColor: 'blue',
  },
  recipeText: { fontSize: 16, height: 40 },
  addRecipe_button_container: { 
    marginBottom: 10,
    height: 45,
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  view_button_cont: {
    padding: 10,
  }
});
