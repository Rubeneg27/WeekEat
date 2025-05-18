import React, { JSX, useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, ScrollView, View, } from 'react-native';
import { supabase } from '../../supaBaseClient';
import { weekDays } from '../Week-wrapper/WeekWrapper';
import DraggableCard from '../Draggable-card/DraggableCard';
import WeekDayCard from '../Week-day-card/WeekDayCard';

type FoodItem = {
    id: number;
    name: string;
    ingredients: string;
    description: string;
  };
  
export default function Foods(): JSX.Element {
    const [food, setFood] = useState<FoodItem[]>([])
    const [isDragging, setIsDragging] = useState (false)

    useEffect(()=>{
        async function getFood() {
            const { data, error } = await supabase.from('food').select('*')
            if (error) console.log (error)
            else {
              // console.log(data)
              setFood(data)
            }
        }
        getFood();
    },[]);

    return (
      <ScrollView horizontal style={styles.foodWrapper}>
        {food.map(item => (
          <WeekDayCard day={item.name}></WeekDayCard>
        ))}
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    foodWrapper: {
      backgroundColor: 'purple',
    },
  });