const InfoBtn = ({ className }: { className?: string }) => {
  return (
    <button
      className={`bg-white rounded-full text-black absolute aspect-square w-[12px] text-[8px] ${className}`}
    >
      i
    </button>
  );
};

export default InfoBtn;
