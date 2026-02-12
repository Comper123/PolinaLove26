export default function Wish({
  wish,
  index
}) {
// Чередование цветов для карточек
  const colors = [
    'from-pink-400 to-red-400',
    'from-purple-400 to-pink-400',
    'from-red-400 to-rose-400',
    'from-rose-400 to-pink-400',
    'from-pink-400 to-purple-400',
    'from-red-400 to-pink-400',
  ];
  return (
    <div className={`
      bg-gradient-to-br ${colors[index % colors.length]} 
      rounded-xl sm:rounded-2xl p-4 sm:p-6 
      shadow-lg hover:shadow-2xl hover:cursor-pointer
      transform hover:-translate-y-1 transition-all duration-300
      text-white
    `}>
      <div className="text-3xl md:text-4xl mb-2 sm:mb-3 sm:text-xl">{wish.emoji}</div>
      <h3 className="text-lg font-bold mb-1 sm:mb-2 sm:text-lg md:text-2xl">{wish.title}</h3>
      <p className="text-white/90 text-xs leading-relaxed sm:text-xs md:text-base">{wish.text}</p>
    </div>
  );
}