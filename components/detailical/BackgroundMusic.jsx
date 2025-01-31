import React, { useEffect, useRef, useState } from 'react';

const BackgroundMusic = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // تابع پخش موسیقی که پس از کلیک کاربر اجرا می‌شود
  const handlePlayMusic = () => {
    // اطمینان از اینکه صدا بعد از تعامل کاربر شروع به پخش کند
    if (audioRef.current) {
      // پخش موسیقی با دستور play()
      audioRef.current.play().then(() => {
        setIsPlaying(true);  // وضعیت پخش را به "در حال پخش" تغییر می‌دهیم
      }).catch((error) => {
        console.error("Error playing the audio:", error);
      });
    }
  };

  // تنظیم حلقه برای موسیقی بعد از پخش
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.loop = true;  // تکرار موسیقی
    }
  }, [isPlaying]);

  return (
    <div>
      {/* دکمه برای شروع موسیقی */}
      {!isPlaying && (
        <button
          onClick={handlePlayMusic}
          className="fixed bottom-5 right-5 py-3 px-6 text-lg font-semibold text-gray-800 bg-yellow-400 hover:bg-yellow-300 rounded-full border-2 border-yellow-500 shadow-lg transform transition-all duration-300 hover:scale-105 z-50"
        >
          شروع موسیقی قهوه
        </button>
      )}

      {/* استفاده از لینک آهنگ کسری زاهدی */}
      <audio ref={audioRef} preload="auto">
        <source 
          src="https://musics-fa.com/download-song/100720/"  // لینک آهنگ خیالی نیست
          type="audio/mp3" 
        />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default BackgroundMusic;
