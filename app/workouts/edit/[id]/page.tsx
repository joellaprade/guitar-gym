import BackArrow from '@/reusable/components/BackArrow';
import { Suspense } from 'react';
import { getExercises } from '@/reusable/actions/exercises/getExercises';
import ListSkeleton from '@/reusable/components/ListSkeleton';
import WorkoutForm from '../../(form)/WorkoutForm';
import { getWorkouts } from '@/reusable/actions/workouts/getWorkouts';

type Props = {
  params: Promise<{ id: string }>;
};

const FetchWrapper = async ({ params }: Props) => {
  const { id } = await params;
  const exercises = await getExercises();
  const [workout] = await getWorkouts(id);

  return <WorkoutForm workout={workout} exercises={exercises} />;
};

const Page = ({ params }: Props) => {
  return (
    <>
      <BackArrow link="/workouts" />
      <div className="vertical-container">
        <Suspense fallback={<ListSkeleton />}>
          <FetchWrapper params={params} />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
