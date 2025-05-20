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

  const onAddNewRecipe = () => {
    console.log("Añadiendo receta nueva")
  }

  return (
    <View>
      <View style={styles.addRecipe_button_container}>
        <Button 
            onPress={onAddNewRecipe}
            title="Añadir receta"
            color="green"
            accessibilityLabel="Borrar todas las asignaciones de la semana"
        />
      </View>
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
            <Button 
              onPress={() => onOpenRecipeView(r)}
              title="Ver"
              color="grey"
              accessibilityLabel="Abrir detalles de la receta"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  recipesContainer: { flex: 1, paddingLeft: 10 },
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
  recipeText: { fontSize: 16, height: 40 },
  addRecipe_button_container: { marginVertical: 10, flex: 0.05, flexDirection: 'row', justifyContent: 'space-evenly' }
});
