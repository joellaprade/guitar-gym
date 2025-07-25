'use client';
import { MouseEventHandler } from 'react';
import Play from './Play';

export default ({
  onMouseDown,
  className,
}: {
  onMouseDown?: MouseEventHandler<SVGSVGElement>;
  className?: string;
}) => {
  return <Play onMouseDown={onMouseDown} className={`text-white cursor-pointer ${className}`} />;
};
