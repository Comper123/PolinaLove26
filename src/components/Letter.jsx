export default function Letter({
  letter,
  className = ''
}) {
  return (
    <div className={` ${className}`}>
      <p>{letter.text}</p>
    </div>
  )
}