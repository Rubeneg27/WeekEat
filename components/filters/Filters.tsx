import { JSX } from "react";
import WeekDayCard from "../Week-day-card/WeekDayCard";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const ingredients:string[] = ['Calabaza', 'Queso azul', 'Harina de garbanzo', 'Pistachos', 'Burrata']

export default function Filters():JSX.Element{
    return(
        <ScrollView horizontal style={styles.wrapper}>
            {ingredients.map((ingredient)=>(
                <Text key={ingredient} style={styles.margin}>{ingredient}</Text>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'white',
    },
    margin: {
        margin: 10,
    }
  });