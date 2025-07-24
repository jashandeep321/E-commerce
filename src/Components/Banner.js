import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import img1 from './BannerImage/img1.png';
import img2 from './BannerImage/img2.png';
import img3 from './BannerImage/img3.png';
import img4 from './BannerImage/img4.png';
import SwipeableViews from 'react-swipeable-views';
import './Banner.css';

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <SwipeableViews index={index} onChangeIndex={handleSelect}>
     {/* <Carousel activeIndex={index} onSelect={handleSelect}> */}
    <Carousel>
     <Carousel.Item interval={1000}>
        <img
            className="d-block w-100"
            src={img1}
            alt="First slide"
          />
      </Carousel.Item>
      <Carousel.Item interval={1000}>
        <img
            className="d-block w-100"
            src={img2}
            alt="First slide"
          />
      </Carousel.Item>
      <Carousel.Item interval={1000}>
        <img
            className="d-block w-100"
            src={img3}
            alt="First slide"
          />
      </Carousel.Item>
      <Carousel.Item interval={1000}>
        <img
            className="d-block w-100"
            src={img4}
            alt="First slide"
          />
      </Carousel.Item>
    </Carousel>
    </SwipeableViews>
  );
}

export default ControlledCarousel;