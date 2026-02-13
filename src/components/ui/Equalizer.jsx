import React, { useEffect, useRef, useCallback } from 'react';

export default function Equalizer({ 
  isPlaying, 
  color = 'bg-gradient-to-t from-pink-500 to-purple-500', 
  bars = 4, 
  height = 'h-8', 
  barWidth = 4
}) {
  const barsRef = useRef([]);
  const animationRef = useRef();
  const lastUpdateRef = useRef(0);

  // Функция анимации с использованием requestAnimationFrame
  const animate = useCallback(() => {
    if (!isPlaying) return;

    const now = Date.now();
    // Ограничиваем частоту обновлений до ~60fps (каждые 16ms)
    if (now - lastUpdateRef.current < 16) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }
    lastUpdateRef.current = now;

    barsRef.current.forEach((bar, index) => {
      if (!bar) return;
      
      // Используем синусоиду для более плавной анимации
      const time = now / 200; // Управляем скоростью
      const value = Math.sin(index * 0.8 + time) * 0.4 + 0.5; // Значение от 0.1 до 0.9
      
      // Высота от 20% до 90%
      const height = 20 + value * 70;
      
      bar.style.height = `${height}%`;
      bar.style.opacity = 0.4 + value * 0.6;
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      // Запускаем анимацию
      animationRef.current = requestAnimationFrame(animate);
    } else {
      // Останавливаем анимацию и сбрасываем высоту
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      // Плавно сбрасываем высоту
      barsRef.current.forEach(bar => {
        if (bar) {
          bar.style.height = '20%';
          bar.style.opacity = '0.3';
        }
      });
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, animate]);

  // Определяем ширину через inline style вместо Tailwind класса
  const barStyle = {
    width: `${barWidth}px`,
    transition: 'height 0.1s ease-out, opacity 0.1s ease-out'
  };

  return (
    <div className={`flex items-end gap-0.5 ${height}`}>
      {[...Array(bars)].map((_, i) => (
        <div
          key={i}
          ref={el => barsRef.current[i] = el}
          className={`rounded-full ${color}`}
          style={{ 
            ...barStyle,
            height: '20%',
            opacity: 0.3
          }}
        />
      ))}
    </div>
  );
}