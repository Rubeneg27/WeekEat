// components/recipes/Recipes.tsx

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

export type RecipeItem = {
  id: number;
  name: string;
};

type RecipesProps = {
  recipes: RecipeItem[];
  selectedRecipe: RecipeItem | null;
  onSelectRecipe: (recipe: RecipeItem) => void;
};

export default function Recipes({
  recipes,
  selectedRecipe,
  onSelectRecipe,
}: RecipesProps) {
  return (
    <ScrollView style={styles.recipesContainer}>
      {recipes.map(r => (
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
