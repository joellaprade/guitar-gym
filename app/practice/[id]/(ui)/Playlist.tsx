import ListElement from '@/reusable/components/ListElement';
import { Exercise } from '@/reusable/models/Exercise';
import { Workout } from '@/reusable/models/Workout';
import { Check, Settings, X } from 'lucide-react';
import Loader from '@/reusable/components/ui/Loader';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { usePracticeContext } from '../../PracticeContext';
import { useDragItem } from '@/reusable/hooks/useDragItem';

const Playlist = ({
  workoutRef,
  showPlaylist,
  setShowPlaylist,
}: {
  workoutRef: React.RefObject<Workout>;
  showPlaylist: boolean;
  setShowPlaylist: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { currentExerciseIndex, setCurrentExerciseIndex } = usePracticeContext();
  const router = useRouter();
  const startY = useRef(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [exercises, setExercises] = useState(workoutRef.current.exercises);

  const handlePointerDown = (e: React.MouseEvent<HTMLDivElement>) => (startY.current = e.clientY);
  const handlePointerUp = (e: React.MouseEvent<HTMLDivElement>) => e.clientY - startY.current > 100 && setShowPlaylist(false);
  const getIcon = (i: number) => {
    if (i === currentExerciseIndex) return <Loader className="w-8" />;
    else if (i < currentExerciseIndex) return <Check className="h-8 w-8 text-white" />;
    else return <></>;
  };

  useEffect(() => {
    workoutRef.current.exercises = exercises;
    const i = exercises.findIndex((e) => e.id === selectedId);
    if (i < 0) return;
    setCurrentExerciseIndex(i);
  }, [exercises]);

  useDragItem(selectedId, exercises, setSelectedId, setExercises);

  return (
    <div onPointerDown={handlePointerDown} onPointerUp={handlePointerUp} className={`playlist ${showPlaylist ? 'opacity-100' : 'opacity-0'}`}>
      <X className="absolute top-8 left-8 h-8 w-8 cursor-pointer text-white" onClick={(e) => setShowPlaylist(false)} />
      <Settings className="absolute top-8 right-8 h-8 w-8 cursor-pointer text-white" onClick={(e) => router.push('/settings')} />
      <h1 className="mt-24">Workout</h1>
      <h3 className="secondary opacity-50">30:00</h3>

      <div className="element-list z-1 mt-12 mb-12 w-full px-8" onPointerDown={(e) => e.stopPropagation()} onPointerUp={(e) => e.stopPropagation()}>
        {exercises.map(({ title, bpm, id }: Exercise, i: number) => (
          <ListElement
            title={title}
            subtitle={`${bpm}bpm`}
            actionElement={getIcon(i)}
            key={i}
            onMouseDown={(e) => {
              e.stopPropagation();
              setSelectedId(id);
            }}
            onMouseUp={(e) => {
              e.stopPropagation();
              setSelectedId(null);
            }}
            id={id}
          />
        ))}
      </div>
    </div>
  );
};

export default Playlist;
