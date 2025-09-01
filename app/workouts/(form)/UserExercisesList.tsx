import ListElement from '@/reusable/components/ListElement';
import AddBtn from '@/reusable/components/ui/AddBtn';
import { selectOnFocus } from '@/reusable/lib/clientUtils';
import { Exercise } from '@/reusable/models/Exercise';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  isReversed: boolean;
  exercises: Exercise[];
  setWorkoutExercises: Dispatch<SetStateAction<Exercise[]>>;
};

const UserExercisesList = ({ isReversed, exercises, setWorkoutExercises }: Props) => {
  const router = useRouter();
  const handleAdd = (event: React.MouseEvent<HTMLDivElement>, id: string) => {
    event.stopPropagation();
    const exercise = exercises.find((e) => e.id === id);
    if (!exercise) return;
    setWorkoutExercises((prevState) => [...prevState, exercise]);
    selectOnFocus();
  };
  const finalExercises = isReversed ? [...exercises].reverse() : exercises;

  return exercises.length > 0 ? (
    finalExercises.map((e, i) => (
      <ListElement onMouseDown={(event) => handleAdd(event, e.id)} title={e.title} subtitle={`${e.bpm}bpm`} actionElement={<AddBtn />} key={i} />
    ))
  ) : (
    <div className="flex-center flex h-full flex-col gap-4 text-center">
      <h3>You have not created any exercises yet!</h3>
      <button className="small main" onMouseDown={(e) => router.push('/exercises/create')}>
        Create Exercise
      </button>
    </div>
  );
};

export default UserExercisesList;
