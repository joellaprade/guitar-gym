import BackArrow from '@/reusable/components/BackArrow';
import NavBtn from '@/reusable/components/NavBtn';
import { Suspense } from 'react';
import { getExercises } from '@/reusable/actions/exercises/getExercises';
import ExerciseList from './ExerciseList';
import ListSkeleton from '@/reusable/components/ListSkeleton';

export const dynamic = 'force-static';

const FetchWrapper = async () => {
  const exercises = (await getExercises()) || [];

  return <ExerciseList exercisesProp={exercises} />;
};

const Exercises = () => {
  return (
    <div className="vertical-container">
      <BackArrow link={'/home'} />
      <h1 className="mt-24">Ejercicios</h1>
      <Suspense fallback={<ListSkeleton />}>
        <FetchWrapper />
      </Suspense>
      <NavBtn text="Crear Ejercicio" href="/exercises/create" className="big main mt-12 mb-8" />
    </div>
  );
};

export default Exercises;
