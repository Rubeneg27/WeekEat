import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { ScrollView } from 'react-native';
import WeekDayCard from '../Week-day-card/WeekDayCard';

const weekDays: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

type DropZones = {
  [day: string]: { x: number; y: number; width: number; height: number };
};

type WeekWrapperProps = {
  registerDropZone: (day: string, layout: DropZones[string]) => void;
};

const WeekWrapper = forwardRef(({ registerDropZone }: WeekWrapperProps, ref) => {
  const cardsRefs = useRef<(React.RefObject<any>)[]>([]);

  // Crear refs para cada día (una vez)
  if (cardsRefs.current.length !== weekDays.length) {
    cardsRefs.current = weekDays.map(() => React.createRef());
  }

  // Función para recalcular todos
  const measureAll = () => {
    cardsRefs.current.forEach((cardRef) => {
      if (cardRef.current?.measureLayout) {
        cardRef.current.measureLayout();
      }
    });
  };

  // Exponer measureAll al padre
  useImperativeHandle(ref, () => ({
    measureAll,
  }));

  return (
    <ScrollView horizontal>
      {weekDays.map((day, index) => (
        <WeekDayCard
          key={day}
          day={day}
          registerDropZone={registerDropZone}
          ref={cardsRefs.current[index]}
        />
      ))}
    </ScrollView>
  );
});

export { weekDays };
export default WeekWrapper;
