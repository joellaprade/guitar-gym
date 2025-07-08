import BackArrow from '@/reusable/components/BackArrow';
import NavBtn from '@/reusable/components/NavBtn';
import { Suspense } from 'react';
import { getExercises } from '@/reusable/actions/exercises/getExercises';
import ClientWrapper from './ClientWrapper';
import { Skeleton } from '@/reusable/components/ui/skeleton';

const FetchWrapper = async () => {
  const exercises = (await getExercises()) || [];

  return <ClientWrapper _exercises={JSON.stringify(exercises)} />;
};

const Exercises = () => {
  return (
    <div className="vertical-container">
      <BackArrow link={'/home'} />
      <h1 className="mt-24">Ejercicios</h1>
      <Suspense
        fallback={
          <div className="mt-12 element-list flex flex-col gap-4">
            <Skeleton className="w-full h-20 bg-gray" />
            <Skeleton className="w-full h-20 bg-gray" />
            <Skeleton className="w-full h-20 bg-gray" />
            <Skeleton className="w-full h-20 bg-gray" />
            <Skeleton className="w-full h-20 bg-gray" />
          </div>
        }
      >
        <FetchWrapper />
      </Suspense>
      <NavBtn text="Crear Ejercicio" href="/exercises/create" className="big main mt-12 mb-8" />
    </div>
  );
};

export default Exercises;

// const Exercises = () => {
//   return (
//     <div className="vertical-container">
//       <BackArrow link={'/home'} />
//       <h1 className="mt-24">Ejercicios</h1>
//       <Suspense
//         fallback={
//           <div className="mt-12 element-list flex-center">
//             <Skeleton className=" bg-gray" />
//             <Skeleton className=" bg-gray" />
//             <Skeleton className=" bg-gray" />
//             <Skeleton className=" bg-gray" />
//             <Skeleton className=" bg-gray" />
//           </div>
//         }
//       >
//         <FetchWrapper />
//       </Suspense>
//       <NavBtn text="Crear Ejercicio" href="/exercises/create" className="big main mt-12 mb-8" />
//     </div>
//   );
// };
