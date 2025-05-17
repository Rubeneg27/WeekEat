import { JSX } from "react";
import WeekDayCard from "../Week-day-card/WeekDayCard";
import { View, ScrollView, StyleSheet } from "react-native";

const weekDays:string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

export default function WeekWrapper():JSX.Element {
    return(
        <ScrollView horizontal style={styles.wrapper}>
            {weekDays.map((weekDay)=>(
                <WeekDayCard day={weekDay} key={weekDay}></WeekDayCard>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 30,
    }
  });