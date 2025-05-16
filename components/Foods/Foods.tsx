import React, { JSX, useEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import { supabase } from '../../supaBaseClient';

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
      <ScrollView horizontal>
        {food.map(item => (
          <Text key={item.id} style={styles.foodCard}>
            {item.name}
          </Text>
        ))}
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    foodCard: {
        margin: 10,
        width: 150,
        height: 150,
        backgroundColor: 'yellow'
    }
  });