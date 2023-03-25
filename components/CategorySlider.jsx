import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

const CategorySlider = () => {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={8}
        navigation={true}
        modules={[Navigation]}
        breakpoints={
          // when window width is >= 320px
          {
            520: {
              slidesPerView: 4,
            },
            670: {
              slidesPerView: 6,
            },
            1020: {
              slidesPerView: 8,
            },
          }
        }
        className="relative px-10 bg-red-100 mySwiper"
      >
        <SwiperSlide>
          <CategorySlide>Bestsellers</CategorySlide>
        </SwiperSlide>
        <SwiperSlide>
          <CategorySlide>New releases</CategorySlide>
        </SwiperSlide>
        <SwiperSlide>
          <CategorySlide>Fiction</CategorySlide>
        </SwiperSlide>
        <SwiperSlide>
          <CategorySlide>Nonfiction</CategorySlide>
        </SwiperSlide>
        <SwiperSlide>
          <CategorySlide>Self Help</CategorySlide>
        </SwiperSlide>
        <SwiperSlide>
          <CategorySlide>Business</CategorySlide>
        </SwiperSlide>
        <SwiperSlide>
          <CategorySlide>Mystery</CategorySlide>
        </SwiperSlide>
        <SwiperSlide>
          <CategorySlide>Health</CategorySlide>
        </SwiperSlide>
        <SwiperSlide>
          <CategorySlide>Art</CategorySlide>
        </SwiperSlide>
        <SwiperSlide>
          <CategorySlide>General</CategorySlide>
        </SwiperSlide>
        <SwiperSlide>
          <CategorySlide>History</CategorySlide>
        </SwiperSlide>
        <SwiperSlide>
          <CategorySlide>Investing</CategorySlide>
        </SwiperSlide>
        <SwiperSlide>
          <CategorySlide>Mind</CategorySlide>
        </SwiperSlide>
        <SwiperSlide>
          <CategorySlide>Science</CategorySlide>
        </SwiperSlide>
        <SwiperSlide>
          <CategorySlide>Thrillers</CategorySlide>
        </SwiperSlide>
        <SwiperSlide>
          <CategorySlide>Technology</CategorySlide>
        </SwiperSlide>

        <div className="absolute top-0 left-0 z-10 w-60 h-10 bg-gradient-to-r from-white dark:from-slate-800" />
        <div className="absolute top-0 right-0 z-10 w-60 h-10 bg-gradient-to-l from-white dark:from-slate-800" />
      </Swiper>
    </>
  );
};
export default CategorySlider;

const CategorySlide = ({ children }) => {
  return (
    <div className="p-1 text-center bg-gray-100 rounded-full dark:bg-slate-700">
      {children}
    </div>
  );
};
