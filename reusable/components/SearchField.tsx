import { Search } from 'lucide-react';

type Props = { className: string; placeholder: string };

const SearchField = ({ className, placeholder }: Props) => {
  return (
    <form className={`relative ${className}`}>
      <input className="w-full" type="text" placeholder={placeholder} />
      <div className="aspect-square h-full absolute top-0 right-0 flex items-center justify-center">
        <Search className="text-[#919191] w-4 h-4 stroke-3" />
      </div>
    </form>
  );
};

export default SearchField;
