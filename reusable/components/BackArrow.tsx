import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const BackArrow = ({ link }: { link?: string }) => {
  return (
    <Link className="z-1 absolute text-white top-10 left-1 w-10 h-10" href={link || ''}>
      <ChevronLeft className=" text-white w-10 h-10" />
    </Link>
  );
};

export default BackArrow;
