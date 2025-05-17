import React, { JSX, useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, ScrollView, Animated, View, PanResponder } from 'react-native';
import { supabase } from '../../supaBaseClient';
import DraggableCard from '../Draggable-card/DraggableCard';

type FoodItem = {
    id: number;
    name: string;
    ingredients: string;
    description: string;
  };

export default function Foods(): JSX.Element {
    const [food, setFood] = useState<FoodItem[]>([])

    useEffect(()=>{
        async function getFood() {
            const { data, error } = await supabase.from('food').select('*')
            if (error) console.log (error)
            else {
              console.log(data)
              setFood(data)
            }
        }

        getFood();
    },[]);

    return (
      <ScrollView horizontal style={styles.fullScreen}>
        {food.map(item => (
          <DraggableCard  key={item.id} name={item.name} />
        ))}
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    fullScreen: {
      height: '100%',
      flex: 1,
      position: 'absolute', // permite que los hijos usen 'absolute',
    },
  });