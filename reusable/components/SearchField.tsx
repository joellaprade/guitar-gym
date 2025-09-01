import { Search } from 'lucide-react';
import { Dispatch, Ref, SetStateAction, useEffect, useState } from 'react';
import { handleSearch } from '../lib/clientUtils';

type Props<T extends { title: string; keywords?: string[] }> = {
  ref: Ref<HTMLInputElement> | undefined;
  setIsFocused?: Dispatch<SetStateAction<boolean>>;
  className: string;
  placeholder: string;
  values: T[];
  setter: Dispatch<SetStateAction<T[]>>;
};

const SearchField = <T extends { title: string; keywords?: string[] }>({ ref, setIsFocused, className, placeholder, values, setter }: Props<T>) => {
  const [search, setSearch] = useState('');

  useEffect(() => setter(handleSearch(search, values)), [search]);

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
        id="workout-search-exercises-input"
      />
      <div className="absolute top-0 right-0 flex aspect-square h-full items-center justify-center">
        <Search className="h-4 w-4 stroke-3 text-[#919191]" />
      </div>
    </div>
  );
};

export default SearchField;
