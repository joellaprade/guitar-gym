import PlayBtn from '@/reusable/components/ui/PlayBtn';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePracticeContext } from '../../PracticeContext';

const Metronome = () => {
  const { currentExercise } = usePracticeContext();

  return (
    <div className="metronome">
      <div className="counter flex gap-2.5">
        <div className="outline-3 outline-[#ffffff80] w-1.5 h-1.5 bg-blue-300 rounded-full"></div>
        <div className="outline-3 outline-[#ffffff80] w-1.5 h-1.5 rounded-full"></div>
        <div className="outline-3 outline-[#ffffff80] w-1.5 h-1.5 rounded-full"></div>
      </div>
      <div className="flex justify-center items-center w-full">
        <ChevronLeft className="stroke-white stroke-2 h-15 w-15" />
        <div className="play-btn">
          <PlayBtn className="w-[35%] h-[35%] relative left-1.5 fill-dark-gray" />
        </div>
        <ChevronRight className="stroke-white stroke-2 h-15 w-15" />
      </div>
    </div>
  );
};

export default Metronome;
