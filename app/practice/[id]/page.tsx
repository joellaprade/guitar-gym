import BackArrow from '@/reusable/components/BackArrow';
import InfoBtn from '@/reusable/components/InfoBtn';
import Play from '@/reusable/components/ui/Play';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Playlist = () => {
  return (
    <div className="flex justify-between items-center bg-gray absolute bottom-4 p-2 rounded-lg inset-x-4">
      <div className="flex flex-col items-start">
        <span className="font-bold opacity-50 leading-tight">Up Next</span>
        <h3 className="leading-tight">Hybrid Picking</h3>
      </div>
      <div className="flex-center absolute inset-y-0 right-0 aspect-square ">
        <Play className="w-3.5 h-3.5 fill-white" />
      </div>
    </div>
  );
};

const Metronome = () => {
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
          <Play className="w-[35%] h-[35%] relative left-1.5 fill-dark-gray" />
        </div>
        <ChevronRight className="stroke-white stroke-2 h-15 w-15" />
      </div>
    </div>
  );
};

const PracticePage = () => {
  return (
    <div className="vertical-container">
      <BackArrow link={'/practice'} />
      <h1 className="relative mt-24 w-fit inline mx-auto">
        Alt. Picking <InfoBtn className="-right-[16px]" />
      </h1>
      <h3 className="opacity-50">5 / 32</h3>
      <Metronome />
      <Playlist />
    </div>
  );
};

export default PracticePage;
