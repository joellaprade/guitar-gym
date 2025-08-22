import ListElement from '@/reusable/components/ListElement';
import AddBtn from '@/reusable/components/ui/AddBtn';
import { Break } from '@/reusable/models/Break';
import { Exercise } from '@/reusable/models/Exercise';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect } from 'react';

type Props = {
  isReversed: boolean;
  exercises: Exercise[];
  setWorkoutExercises: Dispatch<SetStateAction<(Exercise | Break)[]>>;
};

const UserExercisesList = ({ isReversed, exercises, setWorkoutExercises }: Props) => {
  const router = useRouter();
  const handleAdd = (event: React.MouseEvent<SVGSVGElement>, id: string) => {
    event.stopPropagation();
    const exercise = exercises.find((e) => e.id === id);
    if (!exercise) return;
    setWorkoutExercises((prevState) => [...prevState, exercise]);
  };
  const finalExercises = isReversed ? [...exercises].reverse() : exercises;

  return exercises.length > 0 ? (
    finalExercises.map((e, i) => (
      <ListElement title={e.title} subtitle={`${e.bpm}bpm`} actionElement={<AddBtn onMouseDown={(event) => handleAdd(event, e.id)} />} key={i} />
    ))
  ) : (
    <div className="text-center flex flex-center flex-col gap-4 h-full">
      <h3>You have not created any exercises yet!</h3>
      <button className="small main" onMouseDown={(e) => router.push('/exercises/create')}>
        Create Exercise
      </button>
    </div>
  );
};

export default UserExercisesList;
