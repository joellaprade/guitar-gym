'use client';

import { Pencil } from 'lucide-react';
import { MouseEventHandler } from 'react';

export default ({
  onMouseDown,
  className,
}: {
  onMouseDown: MouseEventHandler<SVGSVGElement>;
  className?: string;
}) => {
  return (
    <Pencil
      onMouseDown={onMouseDown}
      className={`text-white stroke-2 cursor-pointer ${className}`}
    />
  );
};
