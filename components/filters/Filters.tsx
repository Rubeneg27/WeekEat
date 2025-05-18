import { JSX } from "react";
import { View, Text, ScrollView, StyleSheet, Button } from "react-native";

const categories:string[] = ['Verduras', 'Carnes']
const ingredients:string[] = ['Calabaza', 'Queso azul', 'Harina de garbanzo', 'Pistachos', 'Burrata']

export default function Filters():JSX.Element{

    function addFilter(filtro:string){
        console.log('Añadido filtro' + filtro)
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
                            onPress={() =>addFilter(ingredient)}
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
  