import './index.css';
import Slider from './components/Slider';
import { letters, memories, wishes, reasons } from './data/mockData';
import Memory from './components/Memory';
import Letter from './components/Letter';
import Wish from './components/Wish';
import { useState } from 'react';
import Reason from './components/Reason';
import Countdown from './components/CountDown';
import PhotoGallery from './components/PhotoGallery';
import MusicPlayer from './components/MusicPlayer';


function App() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-900 text-white">
      {/* Основной контент */}
      <div className="container mx-auto py-8 relative z-10">
        {/* Заголовок сайта */}
        <header className="text-center mb-12 animate-slide-in">
          <div className="inline-block mb-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-cursive mb-2">
              Неоновое Признание
            </h1>
            <p className="text-xl text-gray-300 font-mono">
              Для самой яркой звезды в моей галактике
            </p>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center mt-4"
              style={{
                background: 'linear-gradient(45deg, #ff0080, #9d00ff)',
                boxShadow: '0 0 20px #ff0080'
              }}
            >
              <span className="text-3xl">❤️</span>
            </div>
          </div>
        </header>
        
        {/* Воспоминания */}
        <Slider title="Воспоминания" className="mb-12" animationDuration={100}>
          {memories.map(memory => (
            <Memory memory={memory}></Memory>
          ))}
        </Slider>
        
        {/* Письма */}
        <Slider title="Послания" className="mb-12" animationDuration={100}>
          {letters.map(letter => (
            <Letter letter={letter}></Letter>
          ))}
        </Slider>

        {/* Пожелания */}
        <section className="sm:py-8 md:py-16 px-4 bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-3xl shadow-2xl border border-gray-700/50 mb-12">
          <div className="max-w-7xl mx-auto">
            {/* Заголовок */}
            <div className="text-center sm:mb-6 md:mb-12">
              <h2 className="text-4xl sm:text-2xl md:text-5xl font-bold text-pink-600 mb-4 font-cursive">
                Пожелания 💝
              </h2>
              <p className="sm:text-base md:text-lg text-white-600 max-w-2xl mx-auto">
                Мои искренние пожелания для самой прекрасной девушки
              </p>
              <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-red-500 mx-auto mt-4 rounded-full"></div>
            </div>

            {/* Адаптивная сетка */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishes.map((wish, index) => (
                <Wish key={wish.id} wish={wish} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Наша галлерея */}
        <PhotoGallery></PhotoGallery>

        {/* Причины за которые я тебя люблю */}
        <section className="py-16 px-4 bg-gradient-to-b from-gray-900/80 to-gray-800/80 overflow-hidden rounded-3xl shadow-2xl border border-gray-700/50">
          <div className="max-w-full md:w-10/12 mx-auto">
            {/* Заголовок */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-pink-600 mb-4 font-cursive animate-pulse">
                💖 {reasons.length} причин 💖
              </h2>
              <p className="text-lg text-gray-600">почему моё сердце бьётся чаще</p>
              <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-pink-600 mx-auto mt-4 rounded-full"></div>
            </div>

            {/* Сетка с причинами */}
            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6">
              {reasons.map((reason, index) => (
                <Reason reason={reason} index={index} hoveredIndex={hoveredIndex} setHoveredIndex={setHoveredIndex}></Reason>
              ))}
            </div>

            {/* Нижняя часть с общим счётом */}
            <div className="text-center mt-12">
              <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md">
                <span className="text-pink-500 font-bold text-xl">{reasons.length}</span>
                <span className="text-gray-600">причин любить тебя ❤️</span>
              </div>
              <p className='sm:text-sm md:text-lg text-gray-600 mt-6'>Все сюда не поместятся, поэтому тут только часть</p>
            </div>
          </div>

          {/* Анимированные сердечки на фоне (CSS анимация) */}
          <style jsx>{`
            @keyframes float {
              0%, 100% { transform: translateY(0) rotate(0deg); }
              50% { transform: translateY(-20px) rotate(10deg); }
            }
            .animate-float {
              animation: float 6s ease-in-out infinite;
            }
          `}</style>
        </section>

        {/* Треки */}
        <MusicPlayer></MusicPlayer>

        {/* Отсчет до следующего дня любви */}
        <div className="mt-12 mb-8">
          <Countdown />
        </div>

        {/* Футер */}
        <footer className="text-center pt-8 border-t border-gray-800 mt-12">
          <div className="flex justify-center gap-4 mb-4">
            {['❤️', '💖', '💕', '💓', '💗'].map((heart, idx) => (
              <span 
                key={idx}
                className="text-2xl animate-float"
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                {heart}
              </span>
            ))}
          </div>
          <p className="text-gray-400 font-mono">
            Создано с любовью, 14 февраля 2026
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Для самой яркой звезды во Вселенной - Полины
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;