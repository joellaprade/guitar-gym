import { getWorkouts } from '@/reusable/actions/workouts/getWorkouts';
import { Suspense } from 'react';
import Loader from '@/reusable/components/ui/Loader';
import PracticePage from './PracticePage';
import { PracticeProvider } from '../PracticeContext';

const FetchWrapper = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const [workout] = await getWorkouts(id);

  return (
    <PracticeProvider workout={workout}>
      <PracticePage />
    </PracticeProvider>
  );
};

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const loading = (
    <div className="w-full h-full flex-center flex-col gap-4">
      <h2>Loading Workout...</h2>
      <Loader className="w-10" />
    </div>
  );

  return (
    <Suspense fallback={loading}>
      <FetchWrapper params={params} />
    </Suspense>
  );
};

export default Page;
