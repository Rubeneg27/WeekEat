// components/recipes/Recipes.tsx

import React, { useEffect, useState, useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { RecipeItem } from '../../data/types';

type RecipesProps = {
  recipes: RecipeItem[];
  selectedRecipe: RecipeItem | null;
  activeFilters: string[];   
  onSelectRecipe: (recipe: RecipeItem) => void;
};

export default function Recipes({ recipes,selectedRecipe,onSelectRecipe, activeFilters,}: RecipesProps) {

  /** Filtra las recetas:
   *  – Mantiene la receta si AL MENOS UNO de los filtros activos
   *    aparece (ignorando mayúsculas/minúsculas) en su lista de ingredientes.
   *  – Si activeFilters está vacío → muestra todas.
   */
  const filteredRecipes = useMemo(() => {
    // si no hay filtros, devolvemos todas
    if (activeFilters.length === 0) return recipes;

    return recipes.filter((recipe) => {
      const ingredientsLower = recipe.ingredients.map(i => i.toLowerCase());

      // ¿existe algún filtro dentro de los ingredientes?
      return activeFilters.some(filter =>
        ingredientsLower.includes(filter.toLowerCase())
      );
    });
  }, [recipes, activeFilters]);

  return (
    <ScrollView style={styles.recipesContainer}>
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
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  recipesContainer: { flex: 1, paddingLeft: 10, maxWidth: 150 },
  recipeCard: {
    height: 100,
    marginVertical: 6,
    backgroundColor: '#9f9',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recipeSelected: {
    borderWidth: 2,
    borderColor: 'blue',
  },
  recipeText: { fontSize: 16 },
});
