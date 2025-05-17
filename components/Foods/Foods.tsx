import React, { JSX, useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, ScrollView, Animated, View, PanResponder } from 'react-native';
import { supabase } from '../../supaBaseClient';
import WeekWrapper from '../Week-wrapper/WeekWrapper';
import Filters from '../filters/Filters';
import DraggableCard from '../Draggable-card/DraggableCard';

type FoodItem = {
    id: number;
    name: string;
    ingredients: string;
    description: string;
  };

export default function Foods(): JSX.Element {
    const [food, setFood] = useState<FoodItem[]>([])
    const [draggedCard, setDraggedCard] = useState<FoodItem | null>(null);
    const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState (false)
    const dragTimeout = useRef<NodeJS.Timeout | null>(null);
    const draggingDelay = 50;

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
    
    function StartDragging(item: FoodItem) {
      if (isDragging || dragTimeout.current) return;
    
      dragTimeout.current = setTimeout(() => {
        console.log("Dragging " + item.name);
        setDraggedCard(item);
        setIsDragging(true);
      }, draggingDelay);
    }
    
    function FinishDragging() {
      if (dragTimeout.current) {
        clearTimeout(dragTimeout.current);
        dragTimeout.current = null;
      }
    
      setIsDragging(false);
      setDraggedCard(null);
    }    

    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Semana</Text>
        <WeekWrapper></WeekWrapper>
        <Text style={styles.title}>Filtros</Text>
        <Filters></Filters>
        <Text style={styles.title}>Recetas</Text>
        <ScrollView horizontal style={styles.foodWrapper}>
          {food.map(item => (
            <DraggableCard  
            key={item.id} 
            name={item.name}
            onDragStart={() => StartDragging(item)}
            onDragMove={setDragPosition}
            onDragEnd={() => FinishDragging()}
            />
          ))}
        </ScrollView>
          {draggedCard && (
            <Animated.View
              style={[
                styles.dragOverlay,
                {
                  transform: [
                    { translateX: dragPosition.x },
                    { translateY: dragPosition.y },
                  ],
                },
              ]}
              pointerEvents="none"
              >
              <Text style={styles.dragCard}>{draggedCard.name}</Text>
              </Animated.View>
          )}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    foodWrapper: {
      backgroundColor: 'purple',
      height: 100
    },
    mainContainer: {
      flex: 1,
      backgroundColor: 'lightblue',
    },
    dragOverlay: {
      position: 'absolute',
      width: 100,
      height: 100,
      backgroundColor: 'purple',
      zIndex: 999,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 12,
    },
    dragCard: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },
    
    title: {
      paddingTop: 30,
    }
  });