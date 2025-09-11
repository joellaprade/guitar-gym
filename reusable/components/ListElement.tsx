'use client';

type Props = {
  title: string;
  subtitle?: string;
  actionElement?: React.ReactNode;
  deleteElement?: React.ReactNode;
  id?: string;
  i?: number;
  className?: string;
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseUp?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onPointerDown?: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerUp?: (e: React.PointerEvent<HTMLDivElement>) => void;
};

const ListElement = ({ title, subtitle, actionElement, deleteElement, id, i, className, onMouseDown, onMouseUp }: Props) => {
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!deleteElement) return;
    const target = e.currentTarget;
    if (target.scrollLeft > 0) {
      target.scrollLeft = 0;
    } else {
      target.scrollLeft = target.clientHeight;
    }
  };

  return (
    <div className={`${className} list-element`} data-i={i} data-id={id} onMouseDown={deleteElement ? handleScroll : onMouseDown}>
      <div className="flex flex-col py-6">
        <h2 className="text-start leading-tight">{title}</h2>
        <span className="subtitle">{subtitle}</span>
      </div>

      <div className="flex-center inset-y-0 right-0 aspect-square">{actionElement}</div>
      {deleteElement && <div className="flex-center absolute inset-y-0 right-0 aspect-square translate-x-[101%] bg-[#FF6E6E]">{deleteElement}</div>}
    </div>
  );
};

export default ListElement;
