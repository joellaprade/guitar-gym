'use client';

import PlayBtn from '@/reusable/components/ui/PlayBtn';
import { usePracticeContext } from '../../PracticeContext';
import { useRef } from 'react';
import { useMetronomeContext } from '../../MetronomeContext';

const Playlist = () => {
  const { workout, currentExerciseIndex } = usePracticeContext();
  const { changeExercise } = useMetronomeContext();

  const startX = useRef(0);

  const handlePointerDown = (e: React.MouseEvent<HTMLDivElement>) => (startX.current = e.clientX);

  const handlePointerUp = (e: React.MouseEvent<HTMLDivElement>) => {
    const diffX = e.clientX - startX.current;
    if (Math.abs(diffX)) {
      changeExercise(diffX > 0 ? 'prev' : 'next');
    }
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className="flex justify-between items-center bg-gray absolute bottom-4 p-4 rounded-lg inset-x-4"
    >
      <div className="flex flex-col items-start">
        <span className="font-bold opacity-50 leading-tight">Up Next</span>
        <h3 className="leading-tight">
          {workout.exercises[currentExerciseIndex + 1]?.title ?? 'Finish'}
        </h3>
      </div>
      <div className="flex-center absolute inset-y-0 right-0 aspect-square ">
        <PlayBtn className="w-5 h-5 fill-white" />
      </div>
    </div>
  );
};

export default Playlist;
