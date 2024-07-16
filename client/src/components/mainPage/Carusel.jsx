import { useEffect, useState } from 'react';
import './Carusel.css';

export default function Carusel() {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [showShadow, setShowShadow] = useState(false);

  const infoImg = [
    { id: 1, image: '/imageCar/1.jpg' },
    { id: 2, image: '/imageCar/2.jpg' },
    { id: 3, image: '/imageCar/3.jpg' },
    { id: 4, image: '/imageCar/4.jpg' },
    { id: 5, image: '/imageCar/5.jpg' },
  ];

  const toggleShadow = () => {
    setShowShadow(true);
    setTimeout(() => {
      setShowShadow(false);
      setCurrentImgIndex((prevIndex) =>
        prevIndex === infoImg.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
  };

  useEffect(() => {
    toggleShadow();
  }, [currentImgIndex]);

  return (
    <div className='boxImgInfo'>
      {infoImg.map((el, index) => (
        <div key={el.id}>
          <img
            src={el.image}
            className={`imgBox ${
              showShadow && currentImgIndex === index ? 'hasShadow' : ''
            }`}
            alt={`image-${el.id}`}
          />
        </div>
      ))}
    </div>
  );
}
