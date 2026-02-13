import Slider from './Slider';
import { photos } from '../data/mockData';
import FlipPhoto from './FlipPhoto';


// Основной компонент галереи
export default function PhotoGalleryFlip(){
  return (
    <Slider 
      title="Наши истории в фотографиях"
      className="mb-12 mt-12"
      animationDuration={500}
    >
      {/* Страница 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2 md:w-10/12 mx-auto">
        {photos.slice(0, 4).map((photo) => (
          <FlipPhoto 
            key={photo.id}
            src={photo.src}
            title={photo.title}
            description={photo.description}
            date={photo.date}
            backStory={photo.description}
            icon={photo.emoji}
          />
        ))}
      </div>

      {/* Страница 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2 md:w-10/12 mx-auto">
        {photos.slice(4, 8).map((photo) => (
          <FlipPhoto 
            key={photo.id}
            src={photo.src}
            title={photo.title}
            description={photo.description}
            date={photo.date}
            backStory={photo.description}
            icon={photo.emoji}
          />
        ))}
      </div>
    </Slider>
  );
};