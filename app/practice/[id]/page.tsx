'use client';

import { useParams } from 'next/navigation';
import Loader from '@/reusable/components/ui/Loader';
import PracticePage from './PracticePage';
import { PracticeProvider } from '../PracticeContext';
import { MetronomeProvider } from '../MetronomeContext';
import { useWorkoutCache } from '@/reusable/contexts/WorkoutCacheContext';

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const { workouts, isLoading } = useWorkoutCache();

  if (isLoading || !workouts) {
    return (
      <div className="flex-center h-full w-full flex-col gap-4">
        <h2>Loading Workout...</h2>
        <Loader className="w-10" />
      </div>
    );
  }

  const workout = workouts.find((w) => w.id === id);

  if (!workout) {
    return (
      <div className="flex-center h-full w-full flex-col gap-4">
        <h2>Workout not found</h2>
      </div>
    );
  }

  return (
    <PracticeProvider workout={workout}>
      <MetronomeProvider>
        <PracticePage />
      </MetronomeProvider>
    </PracticeProvider>
  );
};

export default Page;
