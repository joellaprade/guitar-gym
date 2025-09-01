import BackArrow from '@/reusable/components/BackArrow';
import ListSkeleton from '@/reusable/components/ListSkeleton';
import NavBtn from '@/reusable/components/NavBtn';
import { Suspense } from 'react';
import WorkoutList from './WorkoutList';
import { getWorkouts } from '@/reusable/actions/workouts/getWorkouts';

export const experimental_ppr = true;

const FetchWrapper = async () => {
  const workouts = (await getWorkouts()) || [];

  return <WorkoutList workoutsProp={workouts} />;
};

const Workouts = () => {
  return (
    <>
      <BackArrow link={'/home'} />
      <div className="vertical-container mx-8">
        <h1 className="mt-12">Workouts</h1>
        <Suspense fallback={<ListSkeleton />}>
          <FetchWrapper />
        </Suspense>
        <NavBtn text="Create Workout" href="/workouts/create" className="big main mt-12 mb-8" />
      </div>
    </>
  );
};

export default Workouts;
