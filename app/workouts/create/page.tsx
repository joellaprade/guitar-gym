import BackArrow from '@/reusable/components/BackArrow';
import { Suspense } from 'react';
import { getExercises } from '@/reusable/actions/exercises/getExercises';
import ListSkeleton from '@/reusable/components/ListSkeleton';
import WorkoutForm from '../(form)/WorkoutForm';

export const experimental_ppr = true;

const FetchWrapper = async () => {
  const exercises = await getExercises();

  return <WorkoutForm exercises={exercises.reverse()} />;
};

const Page = () => {
  return (
    <>
      <BackArrow link="/workouts" />
      <div className="vertical-container">
        <Suspense fallback={<ListSkeleton />}>
          <FetchWrapper />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
