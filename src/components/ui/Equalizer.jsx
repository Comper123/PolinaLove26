import React, { useEffect, useRef } from 'react';

export default function Equalizer({ isPlaying, color, bars = 4, height = 'h-full', barWidth = 4}){
  const barsRef = useRef([]);

  useEffect(() => {
    if (!isPlaying) return;

    const intervals = [];
    
    barsRef.current.forEach((bar, index) => {
      // Каждый столбик двигается с разной скоростью и амплитудой
      const animate = () => {
        if (!bar) return;
        
        // Случайная высота от 30% до 100%
        const randomHeight = Math.floor(Math.random() * 70 + 30);
        bar.style.height = `${randomHeight}%`;
        bar.style.opacity = 0.5 + (randomHeight / 200);
      };

      // Запускаем анимацию для каждого столбика с разными интервалами
      const interval = setInterval(animate, 150 + index * 20);
      intervals.push(interval);
      
      // Первый запуск
      animate();
    });

    return () => {
      intervals.forEach(interval => clearInterval(interval));
      // Сбрасываем высоту
      barsRef.current.forEach(bar => {
        if (bar) bar.style.height = '30%';
      });
    };
  }, [isPlaying]);

  return (
    <div className={`flex items-end gap-0.5 ${height} p-2 px-4`}>
      {[...Array(bars)].map((_, i) => (
        <div
          key={i}
          ref={el => barsRef.current[i] = el}
          className={`
            w-[${barWidth}px] transition-all duration-100
            ${color}
          `}
          style={{ 
            height: isPlaying ? '30%' : '20%',
            opacity: 0.7
          }}
        />
      ))}
    </div>
  );
};
