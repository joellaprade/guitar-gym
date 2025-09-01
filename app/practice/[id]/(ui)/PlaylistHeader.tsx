'use client';

import PlayBtn from '@/reusable/components/ui/PlayBtn';
import { usePracticeContext } from '../../PracticeContext';
import { useRef, useState } from 'react';
import { useMetronomeContext } from '../../MetronomeContext';
import Playlist from './Playlist';

const PlaylistHeader = () => {
  const { workoutRef, currentExerciseIndex } = usePracticeContext();
  const { changeExercise } = useMetronomeContext();
  const [showPlaylist, setShowPlaylist] = useState(false);
  const startX = useRef(0);

  const handlePointerDown = (e: React.MouseEvent<HTMLDivElement>) => (startX.current = e.clientX);
  const handlePointerUp = (e: React.MouseEvent<HTMLDivElement>) => {
    const diffX = e.clientX - startX.current;
    if (Math.abs(diffX) > 100) {
      changeExercise(diffX > 0 ? 'prev' : 'next');
    } else {
      !showPlaylist && setShowPlaylist((prev) => !prev);
    }
  };

  return (
    <div onPointerDown={handlePointerDown} onPointerUp={handlePointerUp} className={`playlist-header ${showPlaylist ? 'playlist-open' : ''}`}>
      <Playlist workoutRef={workoutRef} showPlaylist={showPlaylist} setShowPlaylist={setShowPlaylist} />
      <div className={`${showPlaylist ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
        <div className="flex flex-col items-start">
          <span className="leading-tight font-bold opacity-50">Up Next</span>
          <h3 className="leading-tight">{workoutRef.current.exercises[currentExerciseIndex + 1]?.title ?? 'Finish'}</h3>
        </div>
        <div className="flex-center absolute inset-y-0 right-0 aspect-square">
          <PlayBtn className="h-5 w-5 fill-white" />
        </div>
      </div>
    </div>
  );
};

export default PlaylistHeader;
