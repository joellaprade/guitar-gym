'use client';

import { Trash } from 'lucide-react';

type Props = {
  title: string;
  subtitle: string;
  btn: React.ReactNode;
  id: string;
};

const ListElement = ({ title, subtitle, btn, id }: Props) => {
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (target.scrollLeft > 0) {
      target.scrollLeft = 0;
    } else {
      target.scrollLeft = target.clientHeight;
    }
  };
  return (
    <div onClick={handleScroll} className="list-element">
      <div className="py-6 flex flex-col">
        <h2 className="text-start leading-tight">{title}</h2>
        <span className="subtitle">{subtitle}</span>
      </div>

      <div className="absolute right-0 inset-y-0 aspect-square flex justify-center items-center">
        {btn}
      </div>
      <div className="absolute right-0 translate-x-[101%] inset-y-0 aspect-square flex justify-center items-center bg-[#FF6E6E]  ">
        <Trash className="text-white stroke-2" />
      </div>
    </div>
  );
};

export default ListElement;
