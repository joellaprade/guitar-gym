'use client';

import PlayBtn from '@/reusable/components/ui/PlayBtn';
import { usePracticeContext } from '../../PracticeContext';

const Playlist = () => {
  const { workout, currentExerciseIndex } = usePracticeContext();
  return (
    <div className="flex justify-between items-center bg-gray absolute bottom-4 p-2 rounded-lg inset-x-4">
      <div className="flex flex-col items-start">
        <span className="font-bold opacity-50 leading-tight">Up Next</span>
        <h3 className="leading-tight">{workout.exercises[currentExerciseIndex + 1].title}</h3>
      </div>
      <div className="flex-center absolute inset-y-0 right-0 aspect-square ">
        <PlayBtn className="w-3.5 h-3.5 fill-white" />
      </div>
    </div>
  );
};

export default Playlist;
