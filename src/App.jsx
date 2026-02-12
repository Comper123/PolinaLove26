import './index.css';
import Slider from './components/Slider';
import { letters, memories, wishes } from './data/mockData';
import Memory from './components/Memory';
import Letter from './components/Letter';
import Wish from './components/Wish';

function App() {
  
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
        
        {/* Письма */}
        <Slider title="Послания" className="mb-12" animationDuration={100}>
          {letters.map(letter => (
            <Letter letter={letter}></Letter>
          ))}
        </Slider>

        {/* Пожелания */}
        <section className="py-16 px-4 bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-3xl shadow-2xl border border-gray-700/50 mb-12">
          <div className="max-w-7xl mx-auto">
            {/* Заголовок */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-pink-600 mb-4 font-cursive">
                Пожелания 💝
              </h2>
              <p className="text-lg text-white-600 max-w-2xl mx-auto">
                Мои искренние пожелания для самой прекрасной девушки
              </p>
              <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-red-500 mx-auto mt-4 rounded-full"></div>
            </div>

            {/* Адаптивная сетка */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishes.map((wish, index) => (
                <Wish key={wish.id} wish={wish} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Воспоминания */}
        <Slider title="Воспоминания" className="mb-12" animationDuration={100}>
          {memories.map(memory => (
            <Memory memory={memory}></Memory>
          ))}
        </Slider>

        {/* Причины за которые я тебя люблю */}
        
        {/* Треки */}
        
        {/* Наша галлерея */}

        {/* Отсчет до следующего дня любви */}
        

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