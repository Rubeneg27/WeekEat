import { JSX, use, useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Button } from "react-native";
import { fetchFilters } from "../../data/recipes";

const categories:string[] = ['Verduras', 'Carnes']


export default function Filters():JSX.Element{

    const [ingredients, setIngredients] = useState<string[]>([]);
    const [activeFilters, setActiveFilters] = useState<string[]>([])

    useEffect(() => {
        fetchFilters().then((data) => {
            // Extraemos todos los ingredientes
            const allIngredients = data.flatMap(item => item.ingredients);
            // Eliminamos duplicados
            const uniqueIngredients = Array.from(new Set(allIngredients));

            setIngredients(uniqueIngredients);

        });
    }, []);

    useEffect(()=>{
        console.log(activeFilters)
    },[activeFilters])

    function addFilter(filtro: string) {
        // Evitamos duplicados:
        if (!activeFilters.includes(filtro)) {
            setActiveFilters([...activeFilters, filtro]);
            console.log('Añadido filtro: ' + filtro);
        }
    }

    return(
        <View style={styles.vContainer}>
            <View>
                <ScrollView horizontal style={styles.hContainer}>
                    {categories.map((category)=>(
                        <View style={styles.marginH}>
                            <Button
                            onPress={() =>addFilter(category)}
                            title={category}
                            color="#841584"
                            accessibilityLabel="Add filter to show recipes"
                            />
                        </View>
                    ))}
                </ScrollView>
            </View>
            <ScrollView horizontal style={styles.hContainer}>
                    {ingredients.map((ingredient)=>(
                        <View style={styles.marginH}>
                            <Button
                            onPress={() => addFilter(ingredient)}
                            title={ingredient}
                            color="#73465c"
                            accessibilityLabel="Add filter to show recipes"
                            />
                        </View>
                    ))}
            </ScrollView>
        </View>

    )
}


const styles = StyleSheet.create({
    vContainer: { flex:1, flexDirection:'column', padding:10 },
    hContainer: { padding:10 },
    marginH: { marginHorizontal: 5 }
  });
  