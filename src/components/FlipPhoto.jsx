import { useState } from "react";


// Компонент для отдельной фотографии с переворотом
export default function FlipPhoto({ src, title, description, date, backStory, icon}){
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className="relative h-[300px] md:h-[350px] cursor-pointer group perspective"
      onClick={handleFlip}
    >
      <div className={`
        relative w-full h-full transition-all duration-700 transform-style-3d
        ${isFlipped ? 'rotate-y-180' : ''}
      `}>
        {/* Лицевая сторона - фото */}
        <div className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden shadow-xl">
          <img 
            src={src}
            alt={title}
            className="w-full h-full object-cover"
          />
          {/* Градиент для читаемости текста */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          
          {/* Заголовок на лицевой стороне */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h4 className="text-white font-bold text-lg md:text-xl drop-shadow-lg">
              {title}
            </h4>
            {date && (
              <div className="flex items-center gap-1 text-gray-200 text-sm mt-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{date}</span>
              </div>
            )}
          </div>
          
          {/* Иконка переворота */}
          <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full p-2">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
        </div>
        
        {/* Обратная сторона - текст */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-xl overflow-hidden shadow-xl bg-gradient-to-br from-gray-900 to-gray-800 p-6 flex flex-col">
          {/* Декоративный элемент */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-pink-500/20 to-purple-500/20 rounded-tr-full"></div>
          
          {/* Контент обратной стороны */}
          <div className="relative z-10 flex flex-col h-full">
            <div className="text-3xl mb-3">{icon}</div>
            <h4 className="text-white font-bold text-xl md:text-2xl mb-3 font-cursive">
              {title}
            </h4>
            
            <div className="flex-1 overflow-y-auto">
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                {backStory || description || "Этот момент навсегда останется в моём сердце. Спасибо тебе за это счастье."}
              </p>
            </div>
            
            {date && (
              <div className="mt-4 pt-3 border-t border-gray-700">
                <div className="flex items-center gap-2 text-pink-400 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">{date}</span>
                </div>
              </div>
            )}
            
            {/* Подсказка для возврата */}
            <div className="mt-2 text-center">
              <span className="text-xs text-gray-500">
                👆 Нажми ещё раз, чтобы вернуться
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};