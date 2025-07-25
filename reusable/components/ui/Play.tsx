import { MouseEventHandler } from 'react';

const Play = ({
  className,
  onMouseDown,
}: {
  className?: string;
  onMouseDown?: MouseEventHandler<SVGSVGElement>;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="131"
      height="148"
      viewBox="0 0 131 148"
      fill="none"
      className={`${className}`}
      onMouseDown={onMouseDown}
    >
      <path d="M123.5 86.9904C133.5 81.2169 133.5 66.7831 123.5 61.0096L23 2.98593C13 -2.78757 0.5 4.42931 0.5 15.9763V132.024C0.5 143.571 13 150.788 23 145.014L123.5 86.9904Z" />
    </svg>
  );
};

export default Play;
