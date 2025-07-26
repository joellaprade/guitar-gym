import BackArrow from '@/reusable/components/BackArrow';
import { getWorkouts } from '@/reusable/actions/workouts/getWorkouts';
import { Suspense } from 'react';
import WorkoutList from './WorkoutList';
import ListSkeleton from '@/reusable/components/ListSkeleton';

export const experimental_ppr = true;

const FetchWrapper = async () => {
  const workouts = await getWorkouts();

  return <WorkoutList workouts={workouts} />;
};

const Exercises = () => {
  return (
    <>
      <BackArrow link={'/home'} />
      <div className="vertical-container">
        <h1 className="mt-24">Selecciona Una Rutina</h1>
        <div className="mt-24 mb-24 element-list">
          <Suspense fallback={<ListSkeleton />}>
            <FetchWrapper />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Exercises;
