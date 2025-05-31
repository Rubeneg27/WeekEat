import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { fetchIngredients, fetchCategories } from '../../data/recipes';
import styles from '../styles';

type FiltersProps = {
  ingredientsFilters: string[];
  onAddFilter: (filter: string) => void;
  isActive: boolean;
};

export default function Filters({
  ingredientsFilters,
  onAddFilter,
  isActive,
}: FiltersProps): JSX.Element {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  /* ────────────────────────────── CARGA DE OPCIONES ───────────────────────────── */
  useEffect(() => {
    (async () => {
      const ingData = await fetchIngredients();
      const catData = await fetchCategories();

      setIngredients(
        Array.from(new Set(ingData.flatMap((i) => i.ingredients))),
      );
      setCategories(Array.from(new Set(catData.flatMap((i) => i.Category))));
    })();
  }, []);

  /* ──────────────────────────────────── UI ────────────────────────────────────── */
  return (
    <View
      style={
        isActive
          ? [
              styles.vContainer,
              styles.bg_ntr_color,
              styles.filtersContainer,
              styles.width100,
              styles.padding2,
              styles.shadow_hard,
            ]
          : [
              styles.vContainer,
              styles.filtersContainer,
              styles.width0,
              styles.padding0,
            ]
      }
    >
      {/* ───── Categorías ───── */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((c) => {
          const active = ingredientsFilters.includes(c);
          return (
            <TouchableOpacity
              key={c}
              onPress={() => onAddFilter(c)}
              style={[
                styles.buttonUIadaptable,
                active ? styles.bg_prmy_light_color : styles.bg_scd_lightest_color,
                styles.marginR10,
                styles.marginB10,
              ]}
            >
              <Text>{c}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* ───── Ingredientes ───── */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {ingredients.map((ing) => {
          const active = ingredientsFilters.includes(ing);
          return (
            <TouchableOpacity
              key={ing}
              onPress={() => onAddFilter(ing)}
              style={[
                styles.buttonUIadaptable,
                active ? styles.bg_prmy_light_color : styles.bg_scd_lightest_color,
                styles.marginR10,
                styles.marginB10,
              ]}
            >
              <Text>{ing}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* ───── Filtros activos (chips que se pueden quitar) ───── */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[styles.marginB10, styles.marginR10]}
      >
        {ingredientsFilters.length === 0 ? (
          <Text>Activos: ninguno</Text>
        ) : (
          ingredientsFilters.map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => onAddFilter(f)} // ← vuelve a llamarse para quitarlo
              style={[
                styles.buttonUIadaptable,
                styles.bg_ntr_dark_color,
                styles.marginR10,
              ]}
            >
              <Text style={styles.prmy_light_color}>{f} ✕</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}
