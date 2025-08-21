import { MouseEventHandler } from 'react';

const InfoBtn = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-white rounded-full text-black absolute aspect-square w-[12px] text-[8px] ${className}`}
    >
      i
    </button>
  );
};

export default InfoBtn;
