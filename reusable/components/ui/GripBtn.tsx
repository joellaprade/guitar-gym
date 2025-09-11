'use client';

import { GripVertical } from 'lucide-react';
import { Dispatch, SetStateAction, useRef } from 'react';

const GripBtn = ({ id, setSelectedId }: { id: string; setSelectedId: Dispatch<SetStateAction<string | null>> }) => {
  const gripRef = useRef<SVGSVGElement>(null);

  return (
    <GripVertical
      ref={gripRef}
      onMouseDown={(e) => {
        e.stopPropagation();
        setSelectedId(id);
      }}
      onTouchStart={(e) => {
        e.stopPropagation();
        setSelectedId(id);
      }}
      onTouchEnd={() => setSelectedId(null)}
      onMouseUp={() => setSelectedId(null)}
      className="cursor-pointer text-white"
    />
  );
};

export default GripBtn;
