import React, { useCallback, useState } from "react";

export default function Slider({ 
    children, 
    title, 
    initialPage = 0, 
    animationDuration = 400, 
    className = '' 
}){
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [isTurning, setisTurning] = useState(false);

    // Преобразуем children в массив страниц
    const pages = React.Children.toArray(children);

    // Функция для следующего слайда
    const nextPage = useCallback(() => {
        if (currentPage < pages.length - 1 && !isTurning) {
            setisTurning(true);
            setTimeout(() => {
                setCurrentPage(prev => prev + 1);
                setisTurning(false);
            }, animationDuration)
        }
    }, [currentPage, isTurning, pages.length, animationDuration]);

    // Функция для предыдущего слайда
    const prevPage = useCallback(() => {
        if (currentPage > 0 && !isTurning) {
            setisTurning(true);
            setTimeout(() => {
                setCurrentPage(prev => prev - 1);
                setisTurning(false);
            }, animationDuration)
        }
    }, [currentPage, isTurning, animationDuration]);

    // Функция для перехода на конкретную страницу
    const goToPage = useCallback((index) => {
        if (index !== currentPage && !isTurning) {
            setisTurning(true);
            setTimeout(() => {
                setCurrentPage(index);
                setisTurning(false);
            }, animationDuration)
        }  
    }, [currentPage, isTurning, animationDuration])

    return (
    <div className={`bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl sm:p-4 md:p-6 pt-6 shadow-2xl border relative border-gray-700/50 ${className}`}>
      {/* Заголовок */}
      {title && (
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-cursive">
            {title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mt-3 rounded-full"></div>
        </div>
      )}
        
      {/* Контейнер для слайдов */}
      <div className="relative overflow-hidden rounded-xl bg-gray-900/50 p-4">
        <div 
          className={`flex h-max transition-transform duration-500 ease-in-out ${isTurning ? 'scale-95' : 'scale-100'}`}
          style={{ transform: `translateX(-${currentPage * 100}%)` }}
        >
          {pages.map((page, index) => (
            <div 
              key={index} 
              className="w-full flex-shrink-0 sm:px-3 md:px-4 h-max"
            >
              <div className={`transition-all duration-500 ${
                index === currentPage ? 'opacity-100 scale-100' : 'opacity-40 scale-95'
              }`}>
                {page}
              </div>
            </div>
          ))}
        </div>
        
        {/* Индикатор текущей страницы */}
        <div className="absolute top-4 right-4 bg-gray-900/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-gray-300">
          {currentPage + 1} / {pages.length}
        </div>
      </div>
      <div className="sticky scroll-pt-0">
        {/* Элементы управления */}
        <div className="flex md:flex-row items-center justify-between sm:gap-2 gap-4 sm:mt-3 mt-8">
          {/* Кнопка "Назад" */}
          <button 
            onClick={prevPage} 
            disabled={currentPage === 0}
            className={`flex items-center gap-2 px-3 py-2 md:px-6 md:py-3 text-xs md:text-base rounded-full font-medium transition-all duration-300 ${
              currentPage === 0 
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 hover:from-gray-700 hover:to-gray-800 hover:text-white hover:shadow-lg border border-gray-700 hover:border-purple-500/50'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="sm:hidden md:block">Назад</span>
          </button>
          
          {/* Точки навигации */}
          <div className="flex items-center gap-2">
            {pages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`transition-all duration-300 ${
                  index === currentPage 
                    ? 'w-8 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full' 
                    : 'w-2 h-2 bg-gray-600 rounded-full hover:bg-gray-500'
                }`}
                aria-label={`Перейти на страницу ${index + 1}`}
                title={`Страница ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Кнопка "Вперёд" */}
          <button 
            onClick={nextPage} 
            disabled={currentPage === pages.length - 1}
            className={`flex items-center gap-2 px-3 py-2 md:px-6 md:py-3 text-xs md:text-base rounded-full font-medium transition-all duration-300 ${
              currentPage === pages.length - 1
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 hover:shadow-lg hover:shadow-purple-500/25'
            }`}
          >
            <span className="sm:hidden md:block">Далее</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      
        {/* Быстрая навигация (номера страниц) */}
        <div className="flex justify-center flex-wrap gap-2 mt-6 sm:hidden md:flex">
          {pages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                index === currentPage
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white scale-110 shadow-lg'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
              title={`Быстрый переход к странице ${index + 1}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      
        {/* Прогресс бар */}
        <div className="mt-6">
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${((currentPage + 1) / pages.length) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-400 mt-2">
            <span>Начало</span>
            <span>Прогресс: {Math.round(((currentPage + 1) / pages.length) * 100)}%</span>
            <span>Конец</span>
          </div>
        </div>
      </div>
      
    </div>
  );
}