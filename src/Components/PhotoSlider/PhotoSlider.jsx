
import React, { useRef, useState } from "react";
import { Box } from '@mui/material';

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  FreeMode, Navigation, Thumbs, Lazy
} from 'swiper';
import "swiper/css";
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"

import "./PhotoSlider.css";


// import Swiper core and required modules

// install Swiper modules
SwiperCore.use([Lazy,FreeMode, Navigation, Thumbs]);


export default function PhotoSlider({images}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <Box sx={{mt: 4}}>
      <Swiper style={{ height: "450px", '--swiper-navigation-color': '#fff', '--swiper-pagination-color': '#fff' }} spaceBetween={10} navigation={true} thumbs={{ swiper: thumbsSwiper }} className="mySwiper2">
        {images.map(image => <SwiperSlide key={image}><img src={image}/></SwiperSlide>)}
      </Swiper>
      <Swiper onSwiper={setThumbsSwiper} spaceBetween={10} slidesPerView={4} freeMode={true} watchSlidesProgress={true} className="mySwiper">
        {images.map(image => <SwiperSlide key={image}><img src={image}/></SwiperSlide>)}
      </Swiper>
    </Box>
  )
}