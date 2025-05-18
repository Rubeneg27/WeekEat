import React, { JSX, useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, ScrollView, Animated, View, PanResponder } from 'react-native';
import { supabase } from '../../supaBaseClient';
import WeekWrapper from '../Week-wrapper/WeekWrapper';
import { weekDays } from '../Week-wrapper/WeekWrapper';

import Filters from '../filters/Filters';
import DraggableCard from '../Draggable-card/DraggableCard';

type FoodItem = {
    id: number;
    name: string;
    ingredients: string;
    description: string;
  };

  type DropZones = {
    [day: string]: { x: number; y: number; width: number; height: number };
  };

  
export default function Foods(): JSX.Element {
    const [food, setFood] = useState<FoodItem[]>([])
    const [draggedCard, setDraggedCard] = useState<FoodItem | null>(null);
    const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState (false)
    const [dropZones, setDropZones] = useState<DropZones>({});
    const weekWrapperRef = useRef<any>(null);
    

    const dragTimeout = useRef<NodeJS.Timeout | null>(null);
    const draggedCardRef = useRef<FoodItem | null>(null);
    const dragPositionRef = useRef({ x: 0, y: 0 });


    const draggingDelay = 50;

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

    useEffect(() => {
      dragPositionRef.current = dragPosition;
    }, [dragPosition]);
    
    const registerDropZone = (day: string, layout: DropZones[string]) => {
      setDropZones(prev => ({ ...prev, [day]: layout }));
    };

    async function UpdateDaysPosition() {
      if (weekWrapperRef.current?.measureAll) {
        weekWrapperRef.current.measureAll();
        // Espera un tick para que se registren bien todas las zonas
        await new Promise(res => setTimeout(res, 0));
      }
    }
    
    async function StartDragging(item: FoodItem) {
      if (isDragging || dragTimeout.current) return;
    
      await UpdateDaysPosition()
      dragTimeout.current = setTimeout(() => {
        console.log("Dragging " + item.name);
        setDraggedCard(item);
        draggedCardRef.current = item;
        setIsDragging(true);
      }, draggingDelay);
    }

    function onDrop(day: string) {
      if (draggedCard) {
        console.log(`💥 Asignada ${draggedCard.name} a ${day}`);
        // Aquí puedes actualizar estado, enviar a supabase, etc.
      }
    }

    function FinishDragging() {
      if (dragTimeout.current) {
        clearTimeout(dragTimeout.current);
        dragTimeout.current = null;
      }

      if (draggedCardRef.current) {
        const { x, y } = dragPositionRef.current;
        console.log("Dropped " + draggedCardRef.current.name + " en " + x + " " + y);
        for (const day of weekDays) {
          const zone = dropZones[day];
          if (
            zone &&
            x >= zone.x && x <= zone.x + zone.width &&
            y >= zone.y && y <= zone.y + zone.height
          ) {
            console.log(`🔥 Soltado sobre: ${day}`);
            onDrop(day);
            break;
          }
        }
        
      } else {
        console.log("No dragged Card")
      }

      setIsDragging(false);
      setDraggedCard(null);
      draggedCardRef.current = null;

      console.log("Drag finished")
    }   

    return (
      <View style={styles.mainContainer}>
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
        <View style={styles.flexContainer}>
        <View style={styles.row}>
          <WeekWrapper
            registerDropZone={registerDropZone}
            ref={weekWrapperRef}
          />
        </View>
        {/* <View style={styles.row}>
          <Filters></Filters>
        </View> */}
        <View style={styles.row}>
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
        </View>
        {/* <Text style={styles.title}>Semana</Text> */}

        {/* <Text style={styles.title}>Filtros</Text>

        <Text style={styles.title}>Recetas</Text> */}
        </View>
      </View>
      
    );
  }
  
  const styles = StyleSheet.create({
    foodWrapper: {
      backgroundColor: 'purple',
    },
    row: {
      height: 200,
      backgroundColor: 'grey',
      alignSelf: 'stretch',  // ← ocupa todo el ancho del padre
      // opcional: marginVertical: 10,
    },
    mainContainer: {
      flex: 1,
      position: 'relative'
    },
    flexContainer: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'lightblue',
      justifyContent: 'space-between'
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
      // paddingTop: 30,
    }
  });