'use client';

/*

IMPLEMENTATION:

call useDragItem en componente
crear const [selectedId, setSelectedId] = useState<string | null>(null); en componente
pasarle lista y setter de lista de ejercicios
agregarle setSelectedId al elemento draggable

*/

import { Dispatch, SetStateAction, useEffect } from 'react';
import { getXYAllDevices } from '../lib/clientUtils';
import { Exercise } from '../models/Exercise';
export const useDragItem = (
  selectedId: string | null,
  exercises: Exercise[],
  setSelectedId: Dispatch<SetStateAction<string | null>>,
  setExercises: Dispatch<SetStateAction<Exercise[]>>
) => {
  const handleDrag = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();

    const { clientX, clientY } = getXYAllDevices(e);
    const hoveredElement = document.elementFromPoint(clientX, clientY);
    const listItem = hoveredElement?.closest('.list-element') as HTMLDivElement;
    if (!listItem) return;

    const listItemId = listItem.dataset.id;
    if (listItemId === selectedId) return;

    const selectedIndex = exercises.findIndex((w) => w.id == selectedId);
    const hoveredIndex = exercises.findIndex((w) => w.id == listItemId);

    setExercises((prevState) => {
      let newState: Exercise[] = [...prevState];

      [newState[selectedIndex], newState[hoveredIndex]] = [newState[hoveredIndex], newState[selectedIndex]];

      return newState;
    });
  };

  useEffect(() => {
    const preventScroll = (e: TouchEvent) => e.preventDefault();
    document.addEventListener('mouseup', () => setSelectedId(null));
    document.addEventListener('touchend', () => setSelectedId(null));

    if (selectedId) {
      document.addEventListener('touchmove', preventScroll, {
        passive: false,
      });
      document.addEventListener('mousemove', handleDrag);
      document.addEventListener('touchmove', handleDrag);
    }
    return () => {
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('touchmove', handleDrag);
      document.removeEventListener('touchmove', preventScroll);
    };
  }, [selectedId, exercises]);
};
