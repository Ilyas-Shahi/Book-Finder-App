import 'swiper/css';

import { useRef, useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';

const CategorySlider = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const swiperRef = useRef();

  return (
    <div className="md:px-6 sticky top-4">
      <Swiper
        slidesPerView={3}
        spaceBetween={8}
        navigation={true}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={{
          520: {
            slidesPerView: 4,
          },
          670: {
            slidesPerView: 6,
          },
          1020: {
            slidesPerView: 8,
          },
        }}
        className="relative !pr-24 mySwiper"
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

        {activeSlideIndex > 0 && (
          <button
            className="absolute top-0 h-full left-0 z-20"
            onClick={() => {
              swiperRef?.current.slidePrev();
              setActiveSlideIndex(swiperRef?.current?.activeIndex);
            }}
          >
            <BsChevronLeft size={20} />
          </button>
        )}

        {!swiperRef?.current?.isEnd && (
          <button
            className="absolute top-0 h-full right-0 z-20"
            onClick={() => {
              swiperRef?.current.slideNext();
              setActiveSlideIndex(swiperRef?.current?.activeIndex);
            }}
          >
            <BsChevronRight size={20} />
          </button>
        )}

        {activeSlideIndex > 0 && (
          <div className="absolute top-0 left-0 z-10 w-60 h-full bg-gradient-to-r from-white dark:from-slate-800" />
        )}

        <div className="absolute top-0 right-0 z-10 w-60 h-full bg-gradient-to-l from-white dark:from-slate-800" />
      </Swiper>
    </div>
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
