import { Skeleton } from './ui/skeleton';

const ListSkeleton = () => {
  return (
    <div className="mt-12 element-list flex flex-col gap-4">
      <Skeleton className="w-full h-20 bg-gray" />
      <Skeleton className="w-full h-20 bg-gray" />
      <Skeleton className="w-full h-20 bg-gray" />
      <Skeleton className="w-full h-20 bg-gray" />
      <Skeleton className="w-full h-20 bg-gray" />
    </div>
  );
};

export default ListSkeleton;
