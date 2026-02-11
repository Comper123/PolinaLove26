export const darkRomanticTheme = {
  // Основные цвета
  colors: {
    darkBg: '#1a1a2e',
    darkCard: '#16213e',
    darkAccent: '#0f3460',
    neonPink: '#ff0080',
    neonPurple: '#9d00ff',
    neonBlue: '#00b4d8',
    neonGreen: '#00ff9d',
    textLight: '#e6e6e6',
    textMuted: '#b3b3b3',
    textAccent: '#ffffff',
    borderGlow: '#ff008033',
    shadowGlow: '#9d00ff33'
  },
  
  // Градиенты
  gradients: {
    background: 'linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)',
    card: 'linear-gradient(145deg, #16213e, #1a1a2e)',
    button: 'linear-gradient(45deg, #ff0080, #9d00ff)',
    text: 'linear-gradient(45deg, #ff0080, #00b4d8)',
    glow: 'radial-gradient(circle at center, rgba(255,0,128,0.1) 0%, transparent 70%)'
  },
  
  // Тени
  shadows: {
    card: '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 0, 128, 0.3)',
    button: '0 5px 15px rgba(255, 0, 128, 0.5), 0 0 10px rgba(157, 0, 255, 0.3)',
    text: '0 0 10px currentColor, 0 0 20px rgba(255, 0, 128, 0.5)',
    inner: 'inset 0 2px 10px rgba(0, 0, 0, 0.3)'
  },
  
  // Анимации
  animations: {
    glow: 'glow 2s ease-in-out infinite',
    float: 'float 6s ease-in-out infinite',
    heartbeat: 'heartbeat 1.5s ease-in-out infinite',
    pulse: 'pulse 3s ease-in-out infinite',
    neonFlicker: 'neonFlicker 3s ease-in-out infinite'
  }
};