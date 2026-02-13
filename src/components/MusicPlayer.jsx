import React, { useState, useRef, useEffect } from 'react';
import Slider from './Slider';
import { tracks } from '../data/mockData';


const MusicPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  // Форматирование времени
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  // Управление воспроизведением
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

  // Обновление прогресса
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

  // Автовоспроизведение при смене трека
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    }
  }, [currentTrack, isPlaying]);

  const currentTrackData = tracks[currentTrack];

  return (
    <Slider 
      title="Наш плейлист"
      className="mb-12 mt-12"
      animationDuration={500}
    >
      {/* Страница 1 - Плеер */}
      <div className="p-4 md:p-6">
        <div className="max-w-3xl mx-auto">
          {/* Основной плеер */}
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-gray-700/50">
            
            {/* Верхняя часть с обложкой и информацией */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              {/* Обложка альбома */}
              <div className="relative group mx-auto md:mx-0">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                <div className={`relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10 group-hover:border-pink-500/30 transition-all`}>
                  <img 
                    src={currentTrackData.cover}
                    alt={currentTrackData.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Иконка воспроизведения на обложке */}
                  <div className="absolute bottom-3 right-3">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                      {isPlaying ? (
                        <div className="flex gap-0.5">
                          <div className="w-1 h-4 bg-white animate-pulse"></div>
                          <div className="w-1 h-6 bg-white animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-1 h-3 bg-white animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      ) : (
                        <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Информация о треке */}
              <div className="flex-1 text-center md:text-left">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-pink-500/20 rounded-full text-pink-300 text-xs mb-3">
                    Сейчас играет
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-cursive">
                    {currentTrackData.title}
                  </h3>
                  <p className="text-gray-400 text-lg">{currentTrackData.artist}</p>
                </div>
                
                {/* Визуализация звука (активно при воспроизведении) */}
                {/* {isPlaying && (
                  <div className="flex gap-1 justify-center md:justify-start mb-4">
                    {[...Array(20)].map((_, i) => (
                      <div 
                        key={i}
                        className="w-1 bg-gradient-to-t from-pink-500 to-purple-500 rounded-full animate-pulse"
                        style={{
                          height: `${Math.random() * 30 + 10}px`,
                          animationDelay: `${i * 0.05}s`
                        }}
                      />
                    ))}
                  </div>
                )} */}
              </div>
            </div>
            
            {/* Прогресс-бар */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>{formatTime(progress)}</span>
                <span>{currentTrackData.duration}</span>
              </div>
              <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden group">
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
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all group-hover:from-pink-400 group-hover:to-purple-400"
                  style={{ width: `${(progress / (duration || 1)) * 100}%` }}
                />
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ left: `${(progress / (duration || 1)) * 100}%`, transform: 'translate(-50%, -50%)' }}
                />
              </div>
            </div>
            
            {/* Элементы управления */}
            <div className="flex items-center justify-center gap-6 mb-6">
              <button 
                onClick={prevTrack}
                className="p-3 rounded-full bg-gray-800/80 hover:bg-gray-700/80 text-white transition-colors border border-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
                </svg>
              </button>
              
              <button 
                onClick={togglePlay}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white flex items-center justify-center hover:scale-105 transition-transform shadow-xl hover:shadow-pink-500/30"
              >
                {isPlaying ? (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </button>
              
              <button 
                onClick={nextTrack}
                className="p-3 rounded-full bg-gray-800/80 hover:bg-gray-700/80 text-white transition-colors border border-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.934 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0018 16V8a1 1 0 00-1.6-.8l-5.334 4zM5.934 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0012 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
                </svg>
              </button>
            </div>
            
            {/* Регулятор громкости */}
            <div className="flex items-center gap-3 max-w-xs mx-auto">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                className="w-full h-2 bg-gray-800 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-pink-500 [&::-webkit-slider-thumb]:cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Страница 2 - Список треков */}
      <div className="p-4 md:p-6">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-6 text-center font-cursive">
            Все треки в плейлисте
          </h3>
          
          <div className="space-y-3">
            {tracks.map((track, index) => (
              <button
                key={track.id}
                onClick={() => {
                  setCurrentTrack(index);
                  setIsPlaying(true);
                }}
                className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group
                  ${currentTrack === index 
                    ? 'bg-gradient-to-r from-pink-600/20 to-purple-600/20 border border-pink-500/30' 
                    : 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/30 hover:border-pink-500/20'
                  }`}
              >
                {/* Обложка */}
                <div className={`w-12 h-12 rounded-lg overflow-hidden border-2 ${currentTrack === index ? 'border-pink-500' : 'border-transparent'}`}>
                  <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
                </div>
                
                {/* Информация */}
                <div className="flex-1 text-left">
                  <h4 className={`font-bold ${currentTrack === index ? 'text-pink-300' : 'text-white'}`}>
                    {track.title}
                  </h4>
                  <p className="text-sm text-gray-400">{track.artist}</p>
                </div>
                
                {/* Длительность */}
                <span className="text-sm text-gray-500">{track.duration}</span>
                
                {/* Индикатор текущего трека */}
                {currentTrack === index && isPlaying && (
                  <div className="flex gap-1">
                    <div className="w-1 h-4 bg-pink-500 animate-pulse"></div>
                    <div className="w-1 h-6 bg-purple-500 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1 h-3 bg-pink-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Аудио элемент */}
      <audio
        ref={audioRef}
        src={currentTrackData.song}
        preload="metadata"
        volume={volume}
      />
    </Slider>
  );
};

export default MusicPlayer;