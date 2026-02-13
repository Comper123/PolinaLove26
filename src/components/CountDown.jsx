import { useState, useEffect } from 'react';


export default function Countdown(){
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      
      // Следующий День Святого Валентина (14 февраля)
      let nextValentine = new Date(currentYear, 1, 14); // Месяц 1 = февраль
      
      // Если сегодня уже после 14 февраля, берём следующий год
      if (now >= nextValentine) {
        nextValentine = new Date(currentYear + 1, 1, 14);
      }
      
      const difference = nextValentine - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Форматирование чисел с ведущим нулём
  const formatNumber = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-pink-500/30 shadow-2xl relative overflow-hidden group">
      {/* Декоративные элементы */}
      <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-full blur-2xl group-hover:from-pink-500/20 group-hover:to-purple-500/20 transition-all duration-700"></div>
      <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-full blur-2xl group-hover:from-pink-500/20 group-hover:to-purple-500/20 transition-all duration-700"></div>
      
      {/* Иконка сердечка */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
          <div className="relative w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
            <span className="text-3xl">❤️</span>
          </div>
        </div>
      </div>
      
      {/* Заголовок */}
      <h3 className="text-center text-2xl md:text-3xl font-bold text-white mb-2 font-cursive">
        До следующего Дня любви
      </h3>
      <p className="text-center text-gray-400 text-sm mb-8">
        14 февраля {new Date().getMonth() >= 1 && new Date().getDate() >= 14 
          ? new Date().getFullYear() + 1 
          : new Date().getFullYear()} года
      </p>
      
      {/* Таймер */}
      <div className="grid grid-cols-4 gap-3 md:gap-4">
        {/* Дни */}
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-pink-500/20 shadow-lg group-hover:border-pink-500/40 transition-colors">
          <div className="sm:text-lg md:text-3xl xl:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-500 text-center">
            {formatNumber(timeLeft.days)}
          </div>
          <div className="text-xs md:text-sm text-gray-400 text-center mt-1 uppercase tracking-wider">
            Дней
          </div>
        </div>
        
        {/* Часы */}
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-pink-500/20 shadow-lg group-hover:border-pink-500/40 transition-colors">
          <div className="sm:text-lg md:text-3xl xl:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-500 text-center">
            {formatNumber(timeLeft.hours)}
          </div>
          <div className="text-xs md:text-sm text-gray-400 text-center mt-1 uppercase tracking-wider">
            Часов
          </div>
        </div>
        
        {/* Минуты */}
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-pink-500/20 shadow-lg group-hover:border-pink-500/40 transition-colors">
          <div className="sm:text-lg md:text-3xl xl:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-500 text-center">
            {formatNumber(timeLeft.minutes)}
          </div>
          <div className="text-xs md:text-sm text-gray-400 text-center mt-1 uppercase tracking-wider">
            Минут
          </div>
        </div>
        
        {/* Секунды */}
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-pink-500/20 shadow-lg group-hover:border-pink-500/40 transition-colors relative overflow-hidden">
          {/* Анимированный фон для секунд */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 animate-pulse"></div>
          <div className="relative sm:text-lg md:text-3xl xl:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-500 text-center">
            {formatNumber(timeLeft.seconds)}
          </div>
          <div className="relative text-xs md:text-sm text-gray-400 text-center mt-1 uppercase tracking-wider">
            Секунд
          </div>
        </div>
      </div>
      
      {/* Прогресс бар */}
      <div className="mt-8">
        <div className="flex justify-between text-xs text-gray-400 mb-2 px-1">
          <span>14 февраля {new Date().getFullYear()}</span>
          <span>14 февраля {new Date().getMonth() >= 1 && new Date().getDate() >= 14 
            ? new Date().getFullYear() + 1 
            : new Date().getFullYear()}
          </span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-1000"
            style={{ 
              width: `${(365 - timeLeft.days) / 3.65}%`,
              maxWidth: '100%'
            }}
          ></div>
        </div>
        <p className="text-center text-gray-500 text-xs mt-4">
          {timeLeft.days === 364
            ? 'Сегодня День Святого Валентина! ❤️'
            : 'Скоро снова скажу тебе "Я тебя люблю!"'
          }
        </p>
      </div>
      
      {/* Декоративные сердечки */}
      <div className="flex justify-center gap-2 mt-6">
        {[...Array(5)].map((_, i) => (
          <span 
            key={i} 
            className="text-pink-500/30 text-sm animate-float"
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            ❤️
          </span>
        ))}
      </div>
    </div>
  );
};