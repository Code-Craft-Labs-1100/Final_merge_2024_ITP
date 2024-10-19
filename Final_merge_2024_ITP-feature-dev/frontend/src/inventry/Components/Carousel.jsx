import { useState, useRef } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const CarouselComponent = () => {
  const [autoPlay, setAutoPlay] = useState(true);
  const carouselRef = useRef(null);

  const handleImageClick = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
    setTimeout(() => setAutoPlay(true), 3000);
  };

  const imageStyle = {
    height: '500px',
    objectFit: 'cover', 
  };
  

  return (
    <Carousel 
      showThumbs={false} 
      infiniteLoop 
      autoPlay={autoPlay} 
      interval={3000} 
      showStatus={false}
      ref={carouselRef}
    >
      <div onClick={handleImageClick}>
        <img src="https://www.intellectsoft.net/blog/wp-content/uploads/Hotel-Inventory-Management-System-Process.jpg?v=1689256953&width=3840" alt="Slide 1" style={imageStyle} />
      </div>
      <div onClick={handleImageClick}>
        <img src="https://cdn-hhdpp.nitrocdn.com/QuRCBTAFwhmnRWsehPMcFrXxvlaPotHa/assets/images/optimized/rev-d03a99e/www.beonx.com/wp-content/uploads/2023/06/urjc-Beonx.webp?v=1689347058&width=3840" alt="Slide 2" style={imageStyle} />
      </div>
      <div onClick={handleImageClick}>
        <img src="https://www.inteltagrfid.com/wp-content/uploads/2022/09/Blog-RFID-Linen-and-Asset-Tracking-Solutions-1536x1025.jpg?v=1690794706&width=3840" alt="Slide 3" style={imageStyle} />
      </div>
    </Carousel>
  );
};

export default CarouselComponent;
