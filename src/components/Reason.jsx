export default function Reason({
  reason,
  index,
  hoveredIndex,
  setHoveredIndex,
}) {
  return (
    <div
      key={reason.id}
      className="relative group cursor-pointer"
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {/* Анимированная карточка */}
      <div
        className={`bg-white rounded-2xl p-6 shadow-lg transform transition-all duration-300
        ${
          hoveredIndex === index
            ? "scale-110 -translate-y-2 shadow-2xl bg-gradient-to-br from-pink-500 to-pink-600"
            : "hover:shadow-xl"
        }
        `}
      >
        {/* Эмодзи */}
        <div
          className={`text-4xl mb-3 transition-all duration-300
        ${hoveredIndex === index ? "scale-120 text-white" : "text-pink-500"}`}
        >
          {reason.emoji}
        </div>

        {/* Текст */}
        <p
          className={`
                font-medium transition-all duration-300 text-sm md:text-base
                ${hoveredIndex === index ? "text-white" : "text-gray-700"}
            `}
        >
          {reason.text}
        </p>

        {/* Анимированное сердечко при наведении */}
        {hoveredIndex === index && (
          <div className="absolute -top-2 -right-2 animate-bounce">
            <span className="text-2xl">❤️</span>
          </div>
        )}
      </div>

      {/* Счётчик */}
      <div className="absolute -top-3 -left-3 w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
        {index + 1}
      </div>
    </div>
  );
}
