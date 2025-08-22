import { Break } from '@/reusable/models/Break';
import { Exercise } from '@/reusable/models/Exercise';

import { Plus } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';

const BreakOptions = ({ setData }: { setData: Dispatch<SetStateAction<(Break | Exercise)[]>> }) => {
  const [breakTime, setBreakTime] = useState<number>(0);
  const [showBreakInput, setShowBreakInput] = useState(false);

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
  };

  const handleAddBreak = (duration: number) => {
    const userBreak: Break = {
      title: 'Break',
      duration,
      id: Date.now().toString(),
      isExercise: false,
    };
    setData((prevState) => [...prevState, userBreak]);
  };

  return (
    <div className="flex relative mt-12">
      <input
        className={`min-w-[0px] transition-all duration-1000 ease-in-out ${showBreakInput ? 'flex-grow mr-3' : 'flex-grow-0 p-0'} w-0`}
        value={breakTime}
        onChange={(e) => {
          setBreakTime(Number(e.target.value));
        }}
        onFocus={handleFocus}
        type="number"
        placeholder="Seconds"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleAddBreak(breakTime);
          }
        }}
      />
      <button
        type="button"
        onClick={() => {
          if (!showBreakInput) setShowBreakInput(true);
          else {
            handleAddBreak(breakTime);
          }
        }}
        className={`secondary transition-all duration-1000 ease-in-out p-2.5 flex justify-center ${showBreakInput ? 'bg-white' : 'flex-grow'}`}
      >
        <Plus
          className={`cursor-pointer transition-all duration-1000 ease-in-out text-black w-[20px] h-[20px] stroke-2 delay-300 ${showBreakInput ? 'opacity-100' : 'opacity-0'}`}
        />
        <span className={`transition-all duration-300 text-white text-sm absolute ${showBreakInput ? 'opacity-0' : 'opacity-100'}`}>Add Break</span>
      </button>
    </div>
  );
};

export default BreakOptions;
