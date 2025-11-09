import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
const SliderCarousel = () => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      <SwiperSlide>
        <img
          src="https://i.ibb.co.com/gMn6qjnP/20897.jpg"
          alt="slider images"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://i.ibb.co.com/5hHMYMvg/23935.jpg"
          alt="slider images"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://i.ibb.co.com/PzjwRC6S/23966.jpg"
          alt="slider images"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://i.ibb.co.com/MyZ2kV4g/27358.jpg"
          alt="slider images"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://i.ibb.co.com/JSrvrPS/69856.jpg" alt="slider images" />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://i.ibb.co.com/tPMzT5fT/413896.jpg"
          alt="slider images"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://i.ibb.co.com/BVS47FZm/2148394711.jpg"
          alt="slider images"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default SliderCarousel;
