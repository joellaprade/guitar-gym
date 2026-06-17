'use client';

import BackArrow from '@/reusable/components/BackArrow';
import WorkoutList from './WorkoutList';
import ListSkeleton from '@/reusable/components/ListSkeleton';
import { useWorkoutCache } from '@/reusable/contexts/WorkoutCacheContext';

const Exercises = () => {
  const { workouts, isLoading } = useWorkoutCache();

  return (
    <>
      <BackArrow link={'/home'} />
      <div className="vertical-container mx-8">
        <h1 className="mt-24">Choose a Workout</h1>
        <div className="element-list mt-24 mb-24">
          {isLoading || !workouts ? <ListSkeleton /> : <WorkoutList workouts={workouts} />}
        </div>
      </div>
    </>
  );
};

export default Exercises;
