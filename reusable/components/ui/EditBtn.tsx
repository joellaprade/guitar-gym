'use client';

import { Pencil } from 'lucide-react';
import { MouseEventHandler } from 'react';

export default ({ onMouseDown }: { onMouseDown: MouseEventHandler<SVGSVGElement> }) => {
  return <Pencil onMouseDown={onMouseDown} className="text-white stroke-2 cursor-pointer" />;
};
