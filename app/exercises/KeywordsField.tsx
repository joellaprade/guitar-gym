'use client';

import { selectOnFocus } from '@/reusable/lib/utils';
import { useState } from 'react';

const KeywordsField = ({ keywordsProp }: { keywordsProp?: string[] }) => {
  const [keywords, setKeywords] = useState<string[]>(keywordsProp || ['']);

  const handleKeywords = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    setKeywords((prevState) => {
      prevState[i] = e.target.value;
      if (e.target.value === '' && prevState.length > 1) prevState.splice(i, 1);
      return [...prevState];
    });
  };
  const handleExtraKeyword = () => {
    setKeywords((prevState) => ['', ...prevState]);
  };

  return (
    <div className="vertical-container gap-4">
      {keywords.map((k, i) =>
        i === 0 ? (
          <div className="flex flex-row gap-4" key={0}>
            <input
              name="keywords[]"
              className="flex-grow"
              type="text"
              value={k}
              onChange={(e) => handleKeywords(e, i)}
              onFocus={selectOnFocus}
            />
            <button
              className="secondary small aspect-square h-full text-xl font-normal flex items-center justify-center"
              type="button"
              onClick={handleExtraKeyword}
            >
              +
            </button>
          </div>
        ) : (
          <input
            name="keywords[]"
            className="flex-grow"
            type="text"
            value={k}
            onChange={(e) => handleKeywords(e, i)}
            onFocus={selectOnFocus}
            key={i}
          />
        )
      )}
    </div>
  );
};

export default KeywordsField;
