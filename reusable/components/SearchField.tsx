import { Search } from 'lucide-react';
import { Dispatch, Ref, SetStateAction, useEffect, useState } from 'react';
import { handleSearch } from '../lib/utils';

type Props<T extends { title: string; keywords?: string[] }> = {
  ref: Ref<HTMLInputElement> | undefined;
  setIsFocused?: Dispatch<SetStateAction<boolean>>;
  className: string;
  placeholder: string;
  values: T[];
  setter: Dispatch<SetStateAction<T[]>>;
};

const SearchField = <T extends { title: string; keywords?: string[] }>({
  ref,
  setIsFocused,
  className,
  placeholder,
  values,
  setter,
}: Props<T>) => {
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
      />
      <div className="aspect-square h-full absolute top-0 right-0 flex items-center justify-center">
        <Search className="text-[#919191] w-4 h-4 stroke-3" />
      </div>
    </div>
  );
};

export default SearchField;
