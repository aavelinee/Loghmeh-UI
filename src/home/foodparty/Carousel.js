import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";

import "./Carousel.css";

const BaseCarousel = ({ children }) => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 1,
    // centerMode: true,
    // centerPadding: "10px",
    // rtl: true,
    // arrows:true,
  };

  return <Slider {...settings}>{children}</Slider>;
};

export default BaseCarousel;
