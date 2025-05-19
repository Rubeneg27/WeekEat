import { JSX, use, useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Button } from "react-native";
import { fetchFilters } from "../../data/recipes";

const categories:string[] = ['Verduras', 'Carnes']

type FiltersProps = {
    ingredientsFilters: string[];
    onAddFilter: (filter: string) => void;
  };
  
  export default function Filters({
    ingredientsFilters,
    onAddFilter,
  }: FiltersProps): JSX.Element {
    // mantenemos sólo "ingredients" local
    const [ingredients, setIngredients] = useState<string[]>([]);
  
    useEffect(() => {
      fetchFilters().then((data) => {
        const unique = Array.from(
          new Set(data.flatMap((i) => i.ingredients))
        );
        setIngredients(unique);
      });
    }, []);
  
    return (
      <View style={styles.vContainer}>
        {/* categorías */}
        <ScrollView horizontal style={styles.hContainer}>
          {categories.map((c) => (
            <View key={c} style={styles.marginH}>
              <Button
                title={c}
                onPress={() => onAddFilter(c)}
                color="#841584"
              />
            </View>
          ))}
        </ScrollView>
  
        {/* ingredientes */}
        <ScrollView horizontal style={styles.hContainer}>
          {ingredients.map((ing) => (
            <View key={ing} style={styles.marginH}>
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
            <Text style={{ marginTop: 10 }}>
            Activos: {ingredientsFilters.join(', ') || 'ninguno'}
            </Text>
        </ScrollView>
      </View>
    );
  }


const styles = StyleSheet.create({
    vContainer: { flex:1, flexDirection:'column', padding:10 },
    hContainer: { padding:10 },
    marginH: { marginHorizontal: 5 }
  });
  