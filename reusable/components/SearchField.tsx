import { Search } from 'lucide-react';
import { Dispatch, Ref, SetStateAction } from 'react';

type Props = {
  ref: Ref<HTMLInputElement> | undefined;

  setIsFocused?: Dispatch<SetStateAction<boolean>>;
  setSearch: Dispatch<SetStateAction<string>>;
  className: string;
  placeholder: string;
};

const SearchField = ({ ref, setIsFocused, setSearch, className, placeholder }: Props) => {
  return (
    <div className={`relative ${className}`}>
      <input
        ref={ref && ref}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full"
        type="text"
        placeholder={placeholder}
        onFocus={() => setIsFocused && setIsFocused(true)}
        onBlur={() => setIsFocused && setIsFocused(false)}
      />
      <div className="aspect-square h-full absolute top-0 right-0 flex items-center justify-center">
        <Search className="text-[#919191] w-4 h-4 stroke-3" />
      </div>
    </div>
  );
};

export default SearchField;
