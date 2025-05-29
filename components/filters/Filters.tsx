import { JSX, use, useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Button } from "react-native";
import { fetchIngredients, fetchCategories } from "../../data/recipes";
import styles from "../styles";

type FiltersProps = {
    ingredientsFilters: string[];
    onAddFilter: (filter: string) => void;
    isActive: boolean,
  };
  
  export default function Filters({
    ingredientsFilters,
    onAddFilter,
    isActive
  }: FiltersProps): JSX.Element {
    // mantenemos sólo "ingredients" local
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
  
    useEffect(() => {
      fetchIngredients().then((data) => {
        const uniqueIng = Array.from(
          new Set(data.flatMap((i) => i.ingredients))
        );

        setIngredients(uniqueIng);
      });

        fetchCategories().then((data) => {
        const uniqueCat = Array.from(
        new Set(data.flatMap((i) => i.Category))
        );

        setCategories(uniqueCat)
      })
    }, []);
  
    return (
      <View style={
        isActive ?
        [styles.vContainer, styles.bg_ntr_dark_color, styles.marginR100, styles.filtersContainer, styles.width85, styles.padding2] 
        : [styles.padding0, styles.width0, styles.vContainer, styles.bg_ntr_dark_color, styles.marginR100, styles.filtersContainer, styles.padding0]
        }>
        {/* categorías */}
        <ScrollView horizontal style={[styles.padding0]}>
          {categories.map((c) => (
            <View key={c} style={[styles.marginR10, styles.marginB10]}>
              <Button
                title={c}
                onPress={() => onAddFilter(c)}
                color="#841584"
              />
            </View>
          ))}
        </ScrollView>
  
        {/* ingredientes */}
        <ScrollView horizontal style={[]}>
          {ingredients.map((ing) => (
            <View key={ing} style={[styles.marginR10, styles.marginB10]}>
              <Button
                title={ing}
                onPress={() => onAddFilter(ing)}
                color={ ingredients.includes(ing) ? "#73465c" : "#15465c" }
              />
            </View>
          ))}
        </ScrollView>
  
        {/* mostrar filtros activos */}
        <ScrollView horizontal>
            <Text style={[]}>
            Activos: {ingredientsFilters.join(', ') || 'ninguno'}
            </Text>
        </ScrollView>
      </View>
    );
  }