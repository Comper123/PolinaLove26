import React, { useState, useRef, useEffect } from 'react';
import { tracks } from '../data/mockData';
import { Pause, Play, SkipBack, SkipForward, Menu } from 'lucide-react';
import Equalizer from './ui/Equalizer';


const MusicPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [duration, setDuration] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const audioRef = useRef(null);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  const selectTrack = (index) => {
    setCurrentTrack(index);
    setIsPlaying(true);
    setShowPlaylist(false); // На мобильных закрываем плейлист после выбора
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      nextTrack();
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack]);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    }
  }, [currentTrack, isPlaying]);

  const currentTrackData = tracks[currentTrack];

  return (
    <section className="sm:py-6 md:py-12 px-4 bg-gradient-to-b from-gray-900/80 to-gray-800/80 rounded-3xl shadow-2xl border border-gray-700/50 my-12">
      <div className="max-w-6xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h2 className="sm:text-xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-cursive">
            Музыка, которая тебе нравится
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Аудио элемент */}
        <audio
          ref={audioRef}
          src={currentTrackData.song}
          preload="metadata"
          volume={volume}
        />

        {/* Основной контент */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Левая колонка - плеер */}
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-3xl p-4 md:p-6 shadow-2xl border border-gray-700/50">
            {/* Верхняя часть с обложкой */}
            <div className="flex sm:flex-col md:flex-row gap-4 md:gap-6 mb-6">
              {/* Обложка альбома */}
              <div className="relative group mx-auto sm:mx-0">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10 group-hover:border-pink-500/30 transition-all mx-auto">
                  <img 
                    src={currentTrackData.cover}
                    alt={currentTrackData.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Индикатор воспроизведения на обложке */}
                  <div className="absolute bottom-2 right-2">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                      {isPlaying ? (
                        <Equalizer isPlaying={isPlaying} color={'bg-slate-200'}></Equalizer>
                      ) : (
                        <Play />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Информация о треке */}
              <div className="flex-1 text-center sm:text-left">
                {/* <span className="inline-block px-2 py-0.5 md:px-3 md:py-1 bg-pink-500/20 rounded-full text-pink-300 text-xs mb-2">
                  Сейчас играет
                </span> */}
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 font-cursive">
                  {currentTrackData.title}
                </h3>
                <p className="text-sm md:text-base text-gray-400 mb-3">{currentTrackData.artist}</p>
                
              </div>
            </div>
            
            {/* Прогресс-бар */}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>{formatTime(progress)}</span>
                <span>{currentTrackData.duration}</span>
              </div>
              <div className="relative h-1.5 md:h-2 bg-gray-800 rounded-full overflow-hidden group">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={progress}
                  onChange={(e) => {
                    audioRef.current.currentTime = e.target.value;
                    setProgress(e.target.value);
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div 
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all"
                  style={{ width: `${(progress / (duration || 1)) * 100}%` }}
                />
              </div>
            </div>
            
            {/* Элементы управления */}
            <div className="flex items-center justify-center gap-4 md:gap-6 mb-4">
              <button 
                onClick={prevTrack}
                className="p-2 md:p-3 rounded-full bg-gray-800/80 hover:bg-gray-700/80 text-white transition-colors border border-gray-700"
              >
               <SkipBack />
              </button>
              
              <button 
                onClick={togglePlay}
                className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white flex items-center justify-center hover:scale-105 transition-transform shadow-xl hover:shadow-pink-500/30"
              >
                {isPlaying ? (
                  <Pause />
                ) : (
                  <Play />
                )}
              </button>
              
              <button 
                onClick={nextTrack}
                className="p-2 md:p-3 rounded-full bg-gray-800/80 hover:bg-gray-700/80 text-white transition-colors border border-gray-700"
              >
                <SkipForward />
              </button>
            </div>
            
            {/* Регулятор громкости */}
            <div className="flex items-center gap-2 max-w-xs mx-auto">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => {
                  const val = e.target.value;
                  setVolume(val);
                  if (audioRef.current) {
                    audioRef.current.volume = val;
                  }
                }}
                className="w-full h-1.5 bg-gray-800 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-pink-500"
              />
            </div>

            {/* Кнопка показа плейлиста на мобильных */}
          </div>

          {/* Правая колонка - плейлист */}
          <div className={`
            ${!showPlaylist ? 'block' : 'hidden'} lg:block
            bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-3xl p-4 md:p-6 shadow-2xl border border-gray-700/50
          `}>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 text-center lg:text-left font-cursive">
              Все треки в плейлисте
            </h3>
            
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {tracks.map((track, index) => (
                <button
                  key={track.id}
                  onClick={() => selectTrack(index)}
                  className={`
                    w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group h-full
                    ${currentTrack === index 
                      ? 'bg-gradient-to-r from-pink-600/20 to-purple-600/20 border border-pink-500/30' 
                      : 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/30 hover:border-pink-500/20'
                    }
                  `}
                >
                  {/* Обложка */}
                  <div className={`w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border-2 ${currentTrack === index ? 'border-pink-500' : 'border-transparent'}`}>
                    <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
                  </div>
                  
                  {/* Информация */}
                  <div className="flex-1 text-left min-w-0">
                    <h4 className={`font-bold text-sm md:text-base truncate ${currentTrack === index ? 'text-pink-300' : 'text-white'}`}>
                      {track.title}
                    </h4>
                    <p className="text-xs text-gray-400 truncate">{track.artist}</p>
                  </div>
                  
                  {/* Длительность */}
                  <span className="text-xs text-gray-500 flex-shrink-0">{track.duration}</span>
                  
                  {/* Индикатор текущего трека */}
                  {currentTrack === index && isPlaying && (
                    <Equalizer isPlaying={isPlaying} bars={4} barWidth={2} height={'h-8'}
                    color={'bg-gradient-to-t from-pink-500 to-purple-500'}></Equalizer>
                  )}
                </button>
              ))}
            </div>
            
            {/* Статистика */}
            <div className="mt-4 pt-4 border-t border-gray-700/50 text-center text-xs text-gray-500">
              {tracks.length} треков • Для самой лучшей 💕
            </div>
          </div>
        </div>
      </div>

      {/* Стили для скроллбара */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1f2937;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ec4899;
          border-radius: 8px;
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};

export default MusicPlayer;