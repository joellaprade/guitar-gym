'use client';
import { PlusIcon } from 'lucide-react';
import { MouseEventHandler } from 'react';

export default ({ onMouseDown }: { onMouseDown: MouseEventHandler<SVGSVGElement> }) => {
  return <PlusIcon onMouseDown={onMouseDown} className="text-white cursor-pointer" />;
};
