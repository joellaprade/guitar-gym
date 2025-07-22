'use client';

import { Trash } from 'lucide-react';
import { MouseEventHandler } from 'react';

export default ({ onMouseDown }: { onMouseDown: MouseEventHandler<SVGSVGElement> }) => {
  return <Trash onMouseDown={onMouseDown} className="text-white stroke-2 cursor-pointer" />;
};
