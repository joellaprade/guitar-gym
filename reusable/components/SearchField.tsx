import { Search } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  setSearch: Dispatch<SetStateAction<string>>;
  className: string;
  placeholder: string;
};

const SearchField = ({ setSearch, className, placeholder }: Props) => {
  return (
    <form className={`relative ${className}`}>
      <input
        onChange={(e) => setSearch(e.target.value)}
        className="w-full"
        type="text"
        placeholder={placeholder}
      />
      <div className="aspect-square h-full absolute top-0 right-0 flex items-center justify-center">
        <Search className="text-[#919191] w-4 h-4 stroke-3" />
      </div>
    </form>
  );
};

export default SearchField;
