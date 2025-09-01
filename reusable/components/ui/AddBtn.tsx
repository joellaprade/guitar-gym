'use client';
import { PlusIcon } from 'lucide-react';
import { MouseEventHandler } from 'react';

export default ({ onMouseDown }: { onMouseDown?: MouseEventHandler<SVGSVGElement> }) => {
  return <PlusIcon onMouseDown={onMouseDown} className="cursor-pointer text-white" />;
};
