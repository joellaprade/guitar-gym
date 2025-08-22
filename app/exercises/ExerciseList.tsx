'use client';

import SearchField from '@/reusable/components/SearchField';
import { Exercise } from '@/reusable/models/Exercise';
import { useState } from 'react';
import ListElement from '@/reusable/components/ListElement';
import { useRouter } from 'next/navigation';
import { deleteExercise } from '@/reusable/actions/exercises/deleteExercise';
import EditBtn from '@/reusable/components/ui/EditBtn';
import DeleteBtn from '@/reusable/components/ui/DeleteBtn';
import { ArrowUpDown } from 'lucide-react';

const ExerciseList = ({ exercisesProp }: { exercisesProp: Exercise[] }) => {
  const router = useRouter();

  const [exercises, setExercises] = useState<Exercise[]>(exercisesProp);
  const [isReversed, setIsReversed] = useState(false);

  const handleEdit = (e: React.MouseEvent<SVGElement>, id: string) => {
    e.stopPropagation();
    router.push(`exercises/edit/${id}`);
  };
  const handleDelete = (e: React.MouseEvent<SVGSVGElement>, id: string) => {
    e.stopPropagation();
    deleteExercise(id);
    setExercises((prevState) => {
      prevState = prevState.filter((p) => p.id !== id);
      return [...prevState];
    });
  };

  const finalExercises = isReversed ? [...exercises].reverse() : exercises;

  return (
    <>
      <div className="flex mt-8 gap-3">
        <SearchField className=" flex-grow" placeholder="Search Exercises" ref={undefined} values={exercisesProp} setter={setExercises} />
        <ArrowUpDown onClick={() => setIsReversed((prev) => !prev)} className={`stroke-white h-full rounded-full ${isReversed && 'bg-gray'}`} />
      </div>

      <div className="mt-12 element-list">
        {exercises.length > 0 ? (
          finalExercises.map(({ title, bpm, id }: Exercise, i: number) => (
            <ListElement
              title={title}
              subtitle={`${bpm}bpm`}
              actionElement={<EditBtn onMouseDown={(e) => handleEdit(e, id)} />}
              deleteElement={<DeleteBtn onMouseDown={(e) => handleDelete(e, id)} />}
              key={i}
            />
          ))
        ) : (
          <div className="text-center flex flex-center flex-col gap-4 h-full">
            <h3>You have not created any exercises yet!</h3>
            <button className="small main" onMouseDown={(e) => router.push('/exercises/create')}>
              Create Exercise
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ExerciseList;
