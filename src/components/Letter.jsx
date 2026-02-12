export default function Letter({
  letter,
  className = ''
}) {
  return (
    <div className={`py-8 ${className}`}>
      <h2 className="text-center mb-5 text-xl font-bold">{letter.title}</h2>
      <p className="text-center sm:w-full sm:px-4 md:w-3/4 md:px-2 mx-auto">{letter.text}</p>
    </div>
  )
}