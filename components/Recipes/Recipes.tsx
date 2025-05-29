// components/recipes/Recipes.tsx

import React, { useEffect, useState, useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Button } from 'react-native';
import { RecipeItem } from '../../data/types';
import styles from '../styles';

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
    <View style={localStyles.recipes_section_container}>
      {/* <View style={localStyles.addRecipe_button_container}>
        <TouchableOpacity 
            onPress={onAddNewRecipe}
            accessibilityLabel="Añadir receta nueva"
            style={[styles.bg_scd_lightest_color, styles.buttonUI, styles.shadow_hard]}
        >
          <Text>Añadir</Text>
        </ TouchableOpacity>
      </View> */}
      <ScrollView style={[localStyles.recipes_container]}>
        {filteredRecipes.map(r => (
          <TouchableOpacity
            key={r.id}
            style={[
              localStyles.recipeCard,
              styles.bg_scd_color,
              styles.dashed_border,
              selectedRecipe?.id === r.id && localStyles.recipeSelected
            ]}
            onPress={() => onSelectRecipe(r)}
          >
            <Text style={[localStyles.recipeText, styles.prmy_light_color]}>{r.name}</Text>
            <View style={localStyles.view_button_cont}>
              <TouchableOpacity 
                onPress={() => onOpenRecipeView(r)}
                accessibilityLabel="Abrir detalles de la receta"
                style={[styles.bg_prmy_light_color, styles.buttonUI]}
              >
                Ver
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const localStyles = StyleSheet.create({
  recipes_section_container: { 
    flex: 1,
  },
  recipes_container: { flex: 1 },
  recipeCard: {
    color: 'white',
    margin: 10, 
    padding: 5,
    height: 131,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recipeSelected: {
    borderWidth: 2,
    borderColor: 'blue',
  },
  recipeText: { fontSize: 16, height: 65 },
  addRecipe_button_container: { 
    padding: 2,
    height: 55,
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-around',

  },
  view_button_cont: {
    padding: 10,
  }
});
