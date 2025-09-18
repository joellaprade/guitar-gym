import { useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
import { Video } from '../types/Video';

const ToolTip = ({ showToolTip, text, video }: { showToolTip: boolean; text?: string | null; video: Video | null }) => {
  const playerRef = useRef<any>(null);

  const onReady = (event: any) => {
    if (!event.target) return;
    playerRef.current = event.target;
    playerRef.current.pauseVideo();
  };

  useEffect(() => {
    if (!playerRef.current) return;
    if (showToolTip) playerRef.current.playVideo();
    else playerRef.current?.pauseVideo();
  }, [showToolTip]);

  return (
    <div
      className={` ${!showToolTip && 'hidden'} color-white text-sm" absolute right-[50%] bottom-0 z-10 flex h-[400px] w-[800px] max-w-[90vw] min-w-[30vw] translate-x-[50%] translate-y-[100%] justify-center rounded-2xl bg-[#323232] p-5`}
    >
      {text}
      {video && (
        <YouTube
          className="w-[700px]"
          videoId={video.videoId}
          opts={{ width: '100%', height: '100%', playerVars: { autoplay: 1, mute: 1, start: video.start }, enablejsapi: 1 }}
          onReady={onReady}
        />
      )}
    </div>
  );
};

export default ToolTip;

/*

      <iframe
        width="280"
        height="157"
        src="https://www.youtube.com/embed/Sa0sBKUiOvU?autoplay=1&mute=1&start=300"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>

      */
