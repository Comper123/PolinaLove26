import React, { useEffect, useRef, useCallback, useState } from 'react';

export default function Equalizer({ 
  isPlaying, 
  color = 'bg-gradient-to-t from-pink-500 to-purple-500', 
  bars = 4, 
  height = 'h-8', 
  barWidth = 4
}) {
  const barsRef = useRef([]);
  const animationRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  // Определяем мобильное устройство
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Простая анимация для мобильных (используем setInterval)
  const startMobileAnimation = useCallback(() => {
    const interval = setInterval(() => {
      barsRef.current.forEach((bar) => {
        if (!bar) return;
        
        // Простая случайная анимация
        const randomHeight = Math.floor(Math.random() * 70 + 20);
        bar.style.height = `${randomHeight}%`;
        bar.style.opacity = 0.4 + (randomHeight / 200);
      });
    }, 200);

    return interval;
  }, []);

  // Анимация для десктопа (requestAnimationFrame)
  const startDesktopAnimation = useCallback(() => {
    let lastUpdate = 0;

    const animate = (timestamp) => {
      if (!isPlaying) return;

      if (timestamp - lastUpdate > 50) { // Ограничиваем до ~20fps на мобильных
        lastUpdate = timestamp;

        barsRef.current.forEach((bar, index) => {
          if (!bar) return;
          
          const time = Date.now() / 200;
          const value = Math.sin(index * 0.8 + time) * 0.4 + 0.5;
          const height = 20 + value * 70;
          
          bar.style.height = `${height}%`;
          bar.style.opacity = 0.4 + value * 0.6;
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) {
      // Сбрасываем при остановке
      barsRef.current.forEach(bar => {
        if (bar) {
          bar.style.height = '20%';
          bar.style.opacity = '0.3';
        }
      });
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    let mobileInterval;
    
    if (isMobile) {
      // Для мобильных используем setInterval
      mobileInterval = startMobileAnimation();
    } else {
      // Для десктопа используем requestAnimationFrame
      startDesktopAnimation();
    }

    return () => {
      if (mobileInterval) {
        clearInterval(mobileInterval);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, isMobile, startMobileAnimation, startDesktopAnimation]);

  // Принудительно устанавливаем видимые размеры
  const barStyle = {
    width: `${barWidth}px`,
    minWidth: `${barWidth}px`,
    height: '20%',
    minHeight: '4px',
    opacity: 0.3,
    transition: 'height 0.1s ease-out, opacity 0.1s ease-out',
    display: 'block', // Убеждаемся, что элемент видим
    backgroundColor: 'currentColor' // Запасной цвет
  };

  return (
    <div className={`flex items-end gap-0.5 ${height}`} style={{ minHeight: '20px' }}>
      {[...Array(bars)].map((_, i) => (
        <div
          key={i}
          ref={el => barsRef.current[i] = el}
          className={`rounded-full ${color}`}
          style={barStyle}
        />
      ))}
    </div>
  );
}