'use client';

import { Dispatch, SetStateAction, useEffect } from 'react';
import { getXYAllDevices } from '../lib/clientUtils';
import { Exercise } from '../models/Exercise';
import { Break } from '@/reusable/models/Break';
export const useDragItem = (
  selectedId: string | null,
  workoutExercises: (Exercise | Break)[],
  setWorkoutExercises: Dispatch<SetStateAction<(Exercise | Break)[]>>,
  setSelectedId: Dispatch<SetStateAction<string | null>>
) => {
  const handleDrag = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();

    const { clientX, clientY } = getXYAllDevices(e);
    const hoveredElement = document.elementFromPoint(clientX, clientY);
    const listItem = hoveredElement?.closest('.list-element') as HTMLDivElement;
    if (!listItem) return;

    const listItemId = listItem.dataset.id;
    if (listItemId === selectedId) return;

    const selectedIndex = workoutExercises.findIndex((w) => w.id == selectedId);
    const hoveredIndex = workoutExercises.findIndex((w) => w.id == listItemId);

    setWorkoutExercises((prevState) => {
      let newState: (Exercise | Break)[] = [...prevState];

      [newState[selectedIndex], newState[hoveredIndex]] = [
        newState[hoveredIndex],
        newState[selectedIndex],
      ];

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
  }, [selectedId, workoutExercises]);
};
