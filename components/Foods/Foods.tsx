import React, { JSX, useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, ScrollView, Animated, View, PanResponder } from 'react-native';
import { supabase } from '../../supaBaseClient';

type FoodItem = {
    id: number;
    name: string;
    ingredients: string;
    description: string;
  };

  const DraggableCard = ({ name }: { name: string }) => {
    const pan = useRef(new Animated.ValueXY()).current;
  
    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event(
          [null, { dx: pan.x, dy: pan.y }],
          { useNativeDriver: false }
        ),
        onPanResponderRelease: () => {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 }, // volver al origen
            useNativeDriver: false,
          }).start();
        },
      })
    ).current;
  
    return (
      <Animated.View
        {...panResponder.panHandlers}
        style={[pan.getLayout(), styles.foodCard]}
      >
        <Text style={styles.cardText}>{name}</Text>
      </Animated.View>
    );
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
          <DraggableCard  key={item.id} name={item.name} />
        ))}
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    foodCard: {
        margin: 10,
        width: 150,
        height: 150,
        backgroundColor: 'orange'
    },
    cardText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });