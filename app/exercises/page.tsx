import BackArrow from '@/reusable/components/BackArrow';
import NavBtn from '@/reusable/components/NavBtn';
import { Suspense } from 'react';
import { getExercises } from '@/reusable/actions/exercises/getExercises';
import ExerciseList from './ExerciseList';
import ListSkeleton from '@/reusable/components/ListSkeleton';

export const experimental_ppr = true;

const FetchWrapper = async () => {
  const exercises = (await getExercises()) || [];

  return <ExerciseList exercisesProp={exercises} />;
};

const Exercises = () => {
  return (
    <div className="vertical-container">
      <BackArrow link={'/home'} />
      <h1 className="mt-12">Exercises</h1>
      <Suspense fallback={<ListSkeleton />}>
        <FetchWrapper />
      </Suspense>
      <NavBtn text="Create Exercise" href="/exercises/create" className="big main mt-12 mb-8" />
    </div>
  );
};

export default Exercises;
