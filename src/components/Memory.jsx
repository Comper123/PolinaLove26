export default function Memory({
  memory,
  className = ''
}){
  return (
    <div className={`${className}`}>
      <h2 className="text-white font-bold sm:text-md md:text-xl mb-2 sm:text-start md:text-center">{memory.id}. {memory.title}</h2>
      <img src={memory.image} alt="" className="m-auto md:w-1/3 sm:h-60 md:h-96 object-cover"/>
      <p className="mt-3 sm:text-xs md:text-base">{memory.description}</p>
      <p className="ml-auto mt-4 bg-gray-800 w-max py-2 px-5 rounded-full font-semibold sm:text-xs sm:mx-auto">{memory.date || "Люблю тебя"}</p>
    </div>
  )
}